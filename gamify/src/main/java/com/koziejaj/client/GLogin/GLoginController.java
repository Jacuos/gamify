package com.koziejaj.client.GLogin;
/**
 * Created by Jacek on 21-01-2017.
 */
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.common.collect.Lists;
import com.koziejaj.client.GMain.GUserQRepository;
import it.ozimov.springboot.mail.model.Email;
import it.ozimov.springboot.mail.model.defaultimpl.DefaultEmail;
import it.ozimov.springboot.mail.service.EmailService;
import org.apache.commons.io.FileUtils;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.koziejaj.client.GMain.GUserRepository;
import com.koziejaj.client.GMain.GUser;

import javax.annotation.Resource;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;


@RestController
public class GLoginController {
    @Autowired
    private GLoginRepository gLoginRep;
    @Autowired
    private GUserRepository gUserRep;
    @Autowired
    private GUserQRepository guserQRep;
    @Autowired
    private GPassResetRepository gPassRep;
    @Autowired
    public EmailService emailService;
    @Resource
    Environment environment;

    @Autowired
    private GLoginBanService gBan;

    @RequestMapping(value="/api/glogin", method = RequestMethod.POST)
    public Object login(@RequestBody GLogin postData, HttpServletRequest request) throws JsonProcessingException {
        GLogin list = gLoginRep.findByLoginAndPassword(postData.getLogin(),postData.getPassword());

        String ipAddress = request.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }

        if(gBan.isBlocked(ipAddress))
            return new ObjectMapper().writeValueAsString("BAN");
        else if(list != null ) {
            GLogin model = list;
            String newToken = generateToken();
            model.setToken(newToken);
            gLoginRep.save(model);

            model.setPassword(newToken);
            model.setToken("");
            return model;
        }
        else
        {
            gBan.loginFailed(ipAddress);
            return null;
        }
    }
    private String generateToken()
    {
        String newToken = UUID.randomUUID().toString();
        if (gLoginRep.findByToken(newToken) == null)
            return newToken;
        else
            return generateToken();
    }


    @RequestMapping(value="/api/addguser", method = RequestMethod.POST)
    public boolean guserRegister(@RequestBody String postData) throws IOException {
        postData = postData.substring(9,postData.length()-1);
        HashMap<String,String> result = new ObjectMapper().readValue(postData, HashMap.class);
        String newLogin = result.get("login");
        if(gLoginRep.findByLogin(newLogin)==null) {
            gLoginRep.save(new GLogin(newLogin, result.get("password"), result.get("email")));
            gUserRep.save(new GUser(newLogin, result.get("firstName"), result.get("lastName"), result.get("description")));

            String imageData = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUQwRERFNTc4MDY1MTFFMkI0NEFCRjQwOUJGODAwMzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUQwRERFNTg4MDY1MTFFMkI0NEFCRjQwOUJGODAwMzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RDBEREU1NTgwNjUxMUUyQjQ0QUJGNDA5QkY4MDAzNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RDBEREU1NjgwNjUxMUUyQjQ0QUJGNDA5QkY4MDAzNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtyZRwYAABirSURBVHjarFoHeBzl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";
            byte[] decoded = Base64.getDecoder().decode(imageData);
            FileUtils.writeByteArrayToFile(new File("target/classes/static/images/" + gUserRep.findByLogin(newLogin).getId() + ".jpg"), decoded);

            return true;
        }
        else
            return false;
    }
    @RequestMapping(value="/api/reqreset")
    public String reqReset(@RequestParam(value="email") String email) throws IOException, AddressException {
        List<GLogin> temp = gLoginRep.findByEmail(email);
        if(temp.size()==0){
            return new ObjectMapper().writeValueAsString("Podane konto nie istnieje");
        }
        else{
            String token = UUID.randomUUID().toString();
            gPassRep.save(new GPassReset(email,token,new Date()));
            sendEmail(email, temp.get(0).getLogin(), token);
            return new ObjectMapper().writeValueAsString("Link do resetu hasła został wysłany.");
        }
    }

    public void sendEmail(String addr, String login, String token) throws AddressException, UnknownHostException {
        String host = InetAddress.getLoopbackAddress().getHostName()+":"+environment.getProperty("local.server.port");
        final Email email = DefaultEmail.builder()
                .from(new InternetAddress("jkapptester@gmail.com"))
                .replyTo(new InternetAddress(addr))
                .to(Lists.newArrayList(new InternetAddress(addr)))
                .subject("Gamify - reset hasła")
                .body("Hej "+login+"!\n\nDoszły nas słuchy że zapomniałeś hasła do swojego konta na: "+host+"\nKliknij w link: http://"+ host+"/setpass;email="+addr+";token="+token+" aby nadać nowe hasło.\nJeśli nie chcesz zmieniać hasła, prosimy o zignorowanie wiadomości.\n\nPozdrawiamy,\nZespół Administracyjny GAMIFY")
                .encoding("UTF-8")
                .build();
        emailService.send(email);
    }
    @RequestMapping(value="/api/setreset", method = RequestMethod.POST)
    public String setReset(@RequestBody String postData) throws IOException {
        HashMap<String,String> result = new ObjectMapper().readValue(postData, HashMap.class);
        String email = result.get("email");
        String token = result.get("token");
        String password = result.get("password");

        GPassReset found = gPassRep.findByEmailAndToken(email, token);
        if(found != null) {
            if(new Date().getTime() - found.getReqDate().getTime() < 86400) {
                List<GLogin> changer = gLoginRep.findByEmail(email);
                changer.get(0).setPassword(password);
                gLoginRep.save(changer.get(0));
                gPassRep.delete(email);
                return new ObjectMapper().writeValueAsString("Hasło zostało zmienione");
            }
            else{
                return new ObjectMapper().writeValueAsString("Link do zmiany hasła jest nieaktualny.");
            }
        }
        else{
            return new ObjectMapper().writeValueAsString("Wystąpił błąd. Spróbuj później.");
        }
    }
}
