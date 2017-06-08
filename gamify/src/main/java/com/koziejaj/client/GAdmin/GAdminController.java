package com.koziejaj.client.GAdmin;
/**
 * Created by Jacek on 21-01-2017.
 */
import com.koziejaj.client.GLogin.GLoginRepository;
import com.koziejaj.client.GMain.GQuestRepository;
import com.koziejaj.client.GMain.GUserQRepository;
import com.koziejaj.client.GMain.GUserRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.koziejaj.client.GMain.GQuest;

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
    @Autowired
    private GBadgeRepository gBadRep;

    @RequestMapping(value="/api/gadmin/newquest", method = RequestMethod.POST)
    public Long newQuest(@RequestParam(value="token") String token, @RequestBody String postData) throws IOException {
        if(gLoginRep.findByTokenAndIsAdmin(token,true) != null) {
            HashMap<String, Object> result = new ObjectMapper().readValue(postData, HashMap.class);
            System.out.println(result.get("description").getClass() + " " + result.get("exp").getClass() + " " + result.get("endOf").getClass());
            System.out.println(result.get("description") + " " + result.get("exp") + " " + result.get("endOf"));
            Long myId = ThreadLocalRandom.current().nextLong(100000000000l, 1000000000000l);
            while (gQuestRep.findById(myId) != null) {
                myId = ThreadLocalRandom.current().nextLong(100000000000l, 1000000000000l);
            }
            LocalDateTime myDate = LocalDateTime.parse(result.get("endOf").toString());
            gQuestRep.save(new GQuest(myId, result.get("description").toString(), (int) result.get("exp"), myDate));
            return myId;

        }
        else
            return null;
    }

    @RequestMapping("/api/gadmin/allquests")
    public Iterable<GQuest> gusers(@RequestParam(value="token") String token) {
        if(gLoginRep.findByTokenAndIsAdmin(token,true) != null) {
            Iterable<GQuest> model = gQuestRep.findAll();
            return model;
        }
        else
            return null;
    }

    @RequestMapping("/api/gadmin/rmguser")
    public boolean rmGuser(@RequestParam(value="id") Long id, @RequestParam(value="token") String token) {
        if(gLoginRep.findByTokenAndIsAdmin(token, true) != null) {
            String login = gUserRep.findOne(id).getLogin();
            gUserRep.delete(id);
            gLoginRep.delete(login);
            guserQRep.removeByGuserId(id);
            return true;
        }
        else
            return false;
    }

    @RequestMapping("/api/gadmin/setparam")
    public boolean setParam(@RequestParam(value="id") String id, @RequestParam(value="value") String value, @RequestParam(value="token") String token) {
        if(gLoginRep.findByTokenAndIsAdmin(token, true) != null) {
            GLayout gl = gLayoutRep.findOne(id);
            gl.setValue(value);
            gLayoutRep.save(gl);
            return true;
        }
        else
            return false;
    }
    @RequestMapping("/api/gadmin/getparams")
    public Iterable<GLayout> getParam(@RequestParam(value="token") String token) {
        if(gLoginRep.findByToken(token) != null) {
            Iterable<GLayout> model = gLayoutRep.findAll();
            return model;
        }
        else
            return null;
    }
    @RequestMapping("/api/gadmin/getcss")
    public String getCss(@RequestParam(value="token") String token) throws IOException {
        if(gLoginRep.findByToken(token) != null) {
            byte[] encoded = Files.readAllBytes(Paths.get("src/main/webapp/styles.css"));
            String model = new String(encoded, Charset.defaultCharset());
            model = model.replace("\r\n", "%D%A");
            model = model.replace("\"", "%22");
            model = model.replace("\\", "%5C");
            model = model.replace("{", "%7B");
            model = model.replace("}", "%7D");
            model = "\"" + model + "\"";
            return model;
        }
        else
            return null;
    }
    @RequestMapping("/api/gadmin/setparams")
    public String setParams(@RequestBody ArrayList<GLayout> postData, @RequestParam(value="token") String token) throws IOException {
        if(gLoginRep.findByTokenAndIsAdmin(token, true) != null) {
            gLayoutRep.save(postData);
            return new ObjectMapper().writeValueAsString("Zmiany zostały zapisane");
        }
        else
            return null;
    }
    @RequestMapping("/api/gadmin/setcss")
    public String setCss(@RequestBody String model, @RequestParam(value="token") String token) throws IOException {
        if(gLoginRep.findByTokenAndIsAdmin(token, true) != null) {
            model = model.substring(1, model.length() - 1);
            model = model.replace("%D%A", "\r\n");
            model = model.replace("%22", "\"");
            model = model.replace("%5C", "\\");
            model = model.replace("%7B", "{");
            model = model.replace("%7D", "}");
            PrintWriter out = new PrintWriter("src/main/webapp/styles.css");
            out.print(model);
            out.close();
            return new ObjectMapper().writeValueAsString("Zmiany zostały zapisane");
        }
        else
            return null;
    }
    @RequestMapping("/api/gadmin/allbadges")
    public List<String> allBadges(@RequestParam(value="token") String token) {
        if(gLoginRep.findByToken(token) != null) {
            File folder = new File("target/classes/static/images/badges");
            File[] listOfFiles = folder.listFiles();
            List<String> model = new ArrayList<String>();
            for (int i = 0; i < listOfFiles.length; i++) {
                if (listOfFiles[i].isFile())
                    model.add(listOfFiles[i].getName());
            }
            return model;
        }
        else
            return null;
    }
    @RequestMapping("/api/gadmin/rmbadge")
    public boolean rmBadge(@RequestParam(value="id") String id, @RequestParam(value="token") String token) {
        if(gLoginRep.findByTokenAndIsAdmin(token, true) != null) {
            File file = new File("target/classes/static/images/badges/" + id);
            file.delete();
            gBadRep.removeByBadge(id);
            return true;
        }
        else
            return false;
    }
    @RequestMapping("/api/gadmin/givebadge")
    public String gvBadge(@RequestParam(value="badge") String badge, @RequestBody String postData, @RequestParam(value="token") String token) throws IOException {
        if(gLoginRep.findByTokenAndIsAdmin(token, true) != null) {
            HashMap<String, Boolean> result = new ObjectMapper().readValue(postData, HashMap.class);
            for (Map.Entry<String, Boolean> entry : result.entrySet()) {
                String key = entry.getKey();
                boolean value = entry.getValue();
                if (value == true)
                    gBadRep.save(new GBadge(key, badge));
            }
            return new ObjectMapper().writeValueAsString("Odznaki zostały przyznane");
        }
        else
            return null;
    }
}
