package com.koziejaj.client.GAdmin;
/**
 * Created by Jacek on 21-01-2017.
 */
import com.koziejaj.client.GLogin.GLoginRepository;
import com.koziejaj.client.GQuestRepository;
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

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;


@RestController
public class GAdminController {
    @Autowired
    private GQuestRepository gQuestRep;

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

}
