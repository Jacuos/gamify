package com.koziejaj.client.GLogin;
/**
 * Created by Jacek on 21-01-2017.
 */
import com.google.common.collect.Lists;
import com.koziejaj.client.GLogin.GLoginRepository;
import com.koziejaj.client.GUserQRepository;
import it.ozimov.springboot.mail.model.Email;
import it.ozimov.springboot.mail.model.defaultimpl.DefaultEmail;
import it.ozimov.springboot.mail.service.EmailService;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.koziejaj.client.GUserRepository;
import com.koziejaj.client.GUser;

import javax.annotation.Resource;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.charset.Charset;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;


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

    @RequestMapping(value="/api/glogin", method = RequestMethod.POST)
    public GLogin login(@RequestBody GLogin postData) {
        List<GLogin> list = gLoginRep.findByLoginAndPassword(postData.getLogin(),postData.getPassword());
        if(list.size()>0) {
            GLogin model = list.get(0);
            return model;
        }
        else return null;
    }

    @RequestMapping(value="/api/addguser", method = RequestMethod.POST)
    public boolean guserRegister(@RequestBody String postData) throws IOException {
        postData = postData.substring(9,postData.length()-1);
        HashMap<String,String> result = new ObjectMapper().readValue(postData, HashMap.class);
        String newLogin = result.get("login");
        if(gLoginRep.findByLogin(newLogin)==null) {
            gLoginRep.save(new GLogin(newLogin, result.get("password"), result.get("email")));
            gUserRep.save(new GUser(newLogin, result.get("firstName"), result.get("lastName"), result.get("description")));
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
            String token = String.valueOf(ThreadLocalRandom.current().nextLong(100000000000l,1000000000000l));
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
