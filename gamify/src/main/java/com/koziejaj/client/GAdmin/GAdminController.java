package com.koziejaj.client.GAdmin;
/**
 * Created by Jacek on 21-01-2017.
 */
import com.koziejaj.client.GLogin.GLoginRepository;
import com.koziejaj.client.GQuestRepository;
import com.koziejaj.client.GUserQRepository;
import com.koziejaj.client.GUserRepository;
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

import com.koziejaj.client.GQuest;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@RestController
public class GAdminController {
    @Autowired
    private GQuestRepository gQuestRep;
    @Autowired
    private GUserRepository gUserRep;
    @Autowired
    private GLoginRepository gLoginRep;
    @Autowired
    private GUserQRepository guserQRep;
    @Autowired
    private GLayoutRepository gLayoutRep;

    @RequestMapping(value="/api/gadmin/newquest", method = RequestMethod.POST)
    public Long newQuest(@RequestBody String postData) throws IOException {
        /*List<GLogin> list = gLoginRep.findByLoginAndPassword(postData.getLogin(),postData.getPassword());
        if(list.size()>0) {
            GLogin model = list.get(0);
            return model;
        }
        else return null;*/

        HashMap<String,Object> result = new ObjectMapper().readValue(postData, HashMap.class);
        System.out.println(result.get("description").getClass()+" "+result.get("exp").getClass()+" "+result.get("endOf").getClass());
        System.out.println(result.get("description")+" "+result.get("exp")+" "+result.get("endOf"));
        Long myId = ThreadLocalRandom.current().nextLong(100000000000l,1000000000000l);
        while(gQuestRep.findById(myId) != null)
        {
            myId = ThreadLocalRandom.current().nextLong(100000000000l,1000000000000l);
        }
        LocalDateTime myDate = LocalDateTime.parse(result.get("endOf").toString());
        gQuestRep.save(new GQuest(myId,result.get("description").toString(),(int)result.get("exp"),myDate));
        return myId;

        //return -1l;
    }

    @RequestMapping("/api/gadmin/allquests")
    public Iterable<GQuest> gusers() {
        Iterable<GQuest> model = gQuestRep.findAll();
        return model;
    }

    @RequestMapping("/api/gadmin/rmguser")
    public boolean rmGuser(@RequestParam(value="id") Long id) {
        String login = gUserRep.findOne(id).getLogin();
        gUserRep.delete(id);
        gLoginRep.delete(login);
        guserQRep.removeByGuserId(id);
        return true;
    }

    @RequestMapping("/api/gadmin/setparam")
    public boolean setParam(@RequestParam(value="id") String id, @RequestParam(value="value") String value) {
        GLayout gl = gLayoutRep.findOne(id);
        gl.setValue(value);
        gLayoutRep.save(gl);
        return true;
    }
    @RequestMapping("/api/gadmin/getparams")
    public Iterable<GLayout> getParam() {
        Iterable<GLayout> model = gLayoutRep.findAll();
        return model;
    }
    @RequestMapping("/api/gadmin/getcss")
    public String getCss() throws IOException {
        byte[] encoded = Files.readAllBytes(Paths.get("src/main/webapp/styles.css"));
        String model =  new String(encoded, Charset.defaultCharset());
        model = model.replace("\r\n","%D%A");
        model = model.replace("\"","%22");
        model = model.replace("\\","%5C");
        model = model.replace("{","%7B");
        model = model.replace("}","%7D");
        model = "\""+ model+"\"";
        return model;
    }
    @RequestMapping("/api/gadmin/setparams")
    public String setParams(@RequestBody ArrayList<GLayout> postData) throws IOException {
        gLayoutRep.save(postData);
        return new ObjectMapper().writeValueAsString("Zmiany zostały zapisane");
    }
    @RequestMapping("/api/gadmin/setcss")
    public String setCss(@RequestBody String model) throws IOException {
        model = model.substring(1,model.length()-1);
        model = model.replace("%D%A","\r\n");
        model = model.replace("%22","\"");
        model = model.replace("%5C","\\");
        model = model.replace("%7B","{");
        model = model.replace("%7D","}");
        PrintWriter out = new PrintWriter("src/main/webapp/styles.css");
        out.print(model);
        out.close();
        return new ObjectMapper().writeValueAsString("Zmiany zostały zapisane");
    }

}
