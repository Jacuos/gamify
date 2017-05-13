package com.koziejaj.client;
/**
 * Created by Jacek on 21-01-2017.
 */
import com.koziejaj.client.GAdmin.GBadge;
import com.koziejaj.client.GAdmin.GBadgeRepository;
import com.koziejaj.client.GAdmin.GLayoutRepository;
import com.koziejaj.client.GLogin.GLoginRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.*;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.beans.beancontext.BeanContextSupport;
import java.io.File;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.io.IOException;
import org.apache.commons.io.IOUtils;

import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.ScriptException;


@RestController
public class ApiController extends HttpServlet {

    @Autowired
    private GUserRepository repository;
    @Autowired
    private GUserQRepository gUserQRep;
    @Autowired
    private GQuestRepository gQuestRep;
    @Autowired
    private GLayoutRepository gLayoutRep;
    @Autowired
    private GBadgeRepository gBadRep;
    @Autowired
    private GLoginRepository gLoginRep;

    @RequestMapping(value = "/api/hello", method = RequestMethod.GET)
    public Map<String,String> hello() {
        Map<String,String> model = new HashMap<String,String>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello World");
        return model;
    }
    @RequestMapping("/api/gusers")
    public Iterable<GUser> gusers(@RequestParam(value="token") String token) {
        if(gLoginRep.findByToken(token) != null) {
            Iterable<GUser> model = repository.findAll();
            return model;
        }
        else
            return null;
    }
    @RequestMapping("/api/guser")
    public GUser guser(@RequestParam(value="id", required = false) String id, @RequestParam(value="log", required = false) String log, @RequestParam(value="token") String token) {
        if(gLoginRep.findByToken(token) != null) {
            GUser model;
            if (log != null)
                model = repository.findByLogin(log);
            else
                model = repository.findOne(Long.parseLong(id, 10));
            return model;
        }
        else
            return null;
    }

    @RequestMapping("/api/guserexists")
    public boolean guserlogin(@RequestParam(value="id", defaultValue="") String login, @RequestParam(value="token") String token) {
        if(gLoginRep.findByToken(token) != null) {
            GUser model = repository.findByLogin(login);
            if (model == null)
                return true;
            else
                return false;
        }
        else
            return false;
    }

    @RequestMapping("/api/guserquests")
    public ArrayList<GQuest> guserQuests(@RequestParam(value="id", defaultValue="0") String id, @RequestParam(value="token") String token) {
        if(gLoginRep.findByToken(token) != null) {
            Iterable<GUserQ> conns = gUserQRep.findByGuserId(Long.parseLong(id, 10));
            ArrayList<GQuest> model = new ArrayList<GQuest>();

            for (GUserQ guserQ : conns) {
                model.add(gQuestRep.findOne(guserQ.getGQuestId()));
            }
            return model;
        }
        else
            return null;
    }

    @RequestMapping(value="/api/addmequest", method = RequestMethod.POST)
    public String addMeQuest(@RequestBody GUserQ postData, @RequestParam(value="token") String token) throws IOException, ScriptException {
        if(gLoginRep.findByTokenAndLogin(token,repository.findOne(postData.getGUserId()).getLogin()) != null) {
            String response;
            Long id = postData.getGUserId();
            Long qid = postData.getGQuestId();
            if (gUserQRep.findByGuserIdAndGquestId(id, qid) != null)//Juz masz tego questa
                response = "Już posiadasz zadanie " + qid + " !";
            else if (gQuestRep.findById(qid) == null)//Quest nie istnieje
                response = "Zadanie " + qid + " nie istnieje!";
            else if (gQuestRep.findById(qid).getEndOf().isBefore(LocalDateTime.now()))//Quest po czasie
                response = "Skończyła się ważność zadania: " + qid;
            else {
                GUser guser = repository.findOne(id);
                guser.setExp(guser.getExp() + gQuestRep.findById(qid).getExp());
                guser = levelUp(guser);
                repository.save(guser);
                gUserQRep.save(postData);
                response = "Zadanie numer " + qid + " zostało dodane!";
            }
            return new ObjectMapper().writeValueAsString(response);
        }
       else
           return null;
    }
    GUser levelUp(GUser g)throws ScriptException{
        HashMap<Integer,Integer> threshold = new HashMap<Integer,Integer>();
        String formula = gLayoutRep.findOne("formula").getValue();

        ScriptEngineManager mgr = new ScriptEngineManager();
        ScriptEngine engine = mgr.getEngineByName("JavaScript");

        for(int i = 0;i<20;i++) {
            String temp = formula.replace("x",Integer.toString(i));
            threshold.put(i,(int) engine.eval(temp));
        }
        if(g.getExp()>=threshold.get(g.getLvl())){
            g.setLvl(g.getLvl()+1);
            return levelUp(g);
        }
        else
            return g;
    }
    @ResponseBody
    @RequestMapping(value = "api/photo", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getPhoto(@RequestParam(value="id", defaultValue="0") String id, @RequestParam(value="token") String token) throws IOException {
        if(gLoginRep.findByToken(token) != null) {
            InputStream in = ApiController.class.getResourceAsStream("/static/images/" + id + ".jpg");
            return IOUtils.toByteArray(in);
            //byte[] b = new byte[10];
            //return b;
        }
        else
            return null;
    }
    @ResponseBody
    @RequestMapping(value = "api/badge", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] badge(@RequestParam(value="name") String name, @RequestParam(value="token") String token) throws IOException {
        if(gLoginRep.findByToken(token) != null) {
            InputStream in = ApiController.class.getResourceAsStream("/static/images/badges/" + name);
            byte[] myOut = IOUtils.toByteArray(in);
            in.close();
            return myOut;
        }
        else
            return null;
    }
    @RequestMapping("/api/mybadges")
    public List<String> myBadges(@RequestParam(value="login") String login, @RequestParam(value="token") String token) {
        if(gLoginRep.findByToken(token) != null) {
            List<GBadge> badges = gBadRep.findByLogin(login);
            List<String> model = new ArrayList<String>();
            for (GBadge bg : badges)
                model.add(bg.getBadge());
            return model;
        }
        else
            return null;
    }

}
