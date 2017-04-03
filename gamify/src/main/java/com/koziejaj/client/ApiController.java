package com.koziejaj.client;
/**
 * Created by Jacek on 21-01-2017.
 */
import com.koziejaj.client.GLogin.GLoginRepository;
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

import java.util.*;
import java.io.IOException;


@RestController
public class ApiController {

    @Autowired
    private GUserRepository repository;
    @Autowired
    private GUserQRepository gUserQRep;
    @Autowired
    private GQuestRepository gQuestRep;

    @RequestMapping(value = "/api/hello", method = RequestMethod.GET)
    public Map<String,String> hello() {
        Map<String,String> model = new HashMap<String,String>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello World");
        return model;
    }
    @RequestMapping("/api/gusers")
    public Iterable<GUser> gusers() {
        Iterable<GUser> model = repository.findAll();
        return model;
    }
    @RequestMapping("/api/guser")
    public GUser guser(@RequestParam(value="id", required = false) String id, @RequestParam(value="log", required = false) String log) {
        GUser model;
        if (log !=null)
            model = repository.findByLogin(log);
        else
            model = repository.findOne(Long.parseLong(id, 10));
        return model;
    }
    @RequestMapping("/api/guserexists")
    public boolean guserlogin(@RequestParam(value="id", defaultValue="") String login) {
        GUser model = repository.findByLogin(login);
        if (model == null)
            return true;
        else
            return false;
    }

    @RequestMapping("/api/guserquests")
    public ArrayList<GQuest> guserQuests(@RequestParam(value="id", defaultValue="0") String id) {

        Iterable<GUserQ> conns = gUserQRep.findByGuserId(Long.parseLong(id, 10));
        ArrayList<GQuest> model = new ArrayList<GQuest>();

        for (GUserQ guserQ : conns){
            model.add(gQuestRep.findOne(guserQ.getGQuestId()));
        }
        return model;
    }

    @RequestMapping(value="/api/addmequest", method = RequestMethod.POST)
    public String addMeQuest(@RequestBody GUserQ postData) throws IOException {
        String response;
        Long id = postData.getGUserId();
        Long qid = postData.getGQuestId();
        if(gUserQRep.findByGuserIdAndGquestId(id, qid) != null)//Juz masz tego questa
            response = "Już posiadasz zadanie "+qid+" !";
        else if(gQuestRep.findById(qid) == null)//Quest nie istnieje
            response = "Zadanie "+qid+" nie istnieje!";
        else if(gQuestRep.findById(qid).getEndOf().before(new Date()))//Quest po czasie
            response = "Skończyła się ważność zadania: "+qid;
        else{
            GUser guser = repository.findOne(id);
            guser.setExp(guser.getExp() + gQuestRep.findById(qid).getExp());
            levelUp(guser);
            gUserQRep.save(postData);
            response = "Zadanie numer "+qid+" zostało dodane!";
        }
        //HashMap<String,Long>result = new ObjectMapper().readValue(postData, HashMap.class);
        return new ObjectMapper().writeValueAsString(response);

       /* String newLogin = result.get("login");
        if(gLoginRep.findByLogin(newLogin)==null) {
            gLoginRep.save(new GLogin(newLogin, result.get("password"), result.get("email")));
            gUserRep.save(new com.koziejaj.client.GUser(newLogin, result.get("firstName"), result.get("lastName"), result.get("description")));
            return true;
        }
        else
            return false;*/
    }
    void levelUp(GUser g){
        HashMap<Integer,Integer> threshold = new HashMap<Integer,Integer>();
        for(int i = 0;i<10;i++) {
            threshold.put(i,i*i*20);
        }
        if(g.getExp()>=threshold.get(g.getLvl())){
            g.setLvl(g.getLvl()+1);
        }
    }

}
