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

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.ArrayList;


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
    public GUser guser(@RequestParam(value="id", defaultValue="0") String id) {
        GUser model = repository.findOne(Long.parseLong(id, 10));
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

}
