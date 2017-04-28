package com.koziejaj.client.GSettings;

/**
 * Created by Jacek on 2017-04-27.
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import com.koziejaj.client.GLogin.GLogin;
import com.koziejaj.client.GLogin.GLoginRepository;
import com.koziejaj.client.GUserRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import com.koziejaj.client.GUser;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.HashMap;


@RestController
public class GSettingsController {
    @Autowired
    private GUserRepository gUserRep;
    @Autowired
    private GLoginRepository gLoginRep;



    @RequestMapping("/api/gsettings/setphoto")
    public boolean photo(@RequestBody String postData) throws IOException{
        HashMap<String,String> result = new ObjectMapper().readValue(postData, HashMap.class);
        String iid = result.get("guserId");
        String imageData = result.get("photo");

        imageData = imageData.substring(imageData.indexOf(",")+1);
        byte[] decoded = Base64.getDecoder().decode(imageData);

        FileUtils.writeByteArrayToFile(new File("target/classes/static/images/"+iid+".jpg"), decoded);
        return true;
    }

    @RequestMapping("/api/gsettings/setdesc")
    public boolean desc(@RequestBody String postData) throws IOException{
        HashMap<String,String> result = new ObjectMapper().readValue(postData, HashMap.class);
        String guid = result.get("guserId");
        String desc = result.get("description");

        GUser updatedUser = gUserRep.findOne(Long.parseLong(guid));
        updatedUser.setDescription(desc);
        gUserRep.save(updatedUser);
        return true;
    }
    @RequestMapping("/api/gsettings/setpass")
    public boolean pass(@RequestBody String postData) throws IOException{
        HashMap<String,String> result = new ObjectMapper().readValue(postData, HashMap.class);
        String login = result.get("login");
        String pass = result.get("password");

        GLogin updatedLogin = gLoginRep.findOne(login);
        updatedLogin.setPassword(pass);
        gLoginRep.save(updatedLogin);
        return true;
    }

}
