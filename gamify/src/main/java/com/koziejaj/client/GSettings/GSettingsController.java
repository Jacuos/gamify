package com.koziejaj.client.GSettings;

/**
 * Created by Jacek on 2017-04-27.
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import com.koziejaj.client.GLogin.GLogin;
import com.koziejaj.client.GLogin.GLoginRepository;
import com.koziejaj.client.GMain.GUserRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import com.koziejaj.client.GMain.GUser;

import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;


@RestController
public class GSettingsController {
    @Autowired
    private GUserRepository gUserRep;
    @Autowired
    private GLoginRepository gLoginRep;



    @RequestMapping("/api/gsettings/setphoto")
    public boolean photo(@RequestBody String postData, @RequestParam(value="token") String token) throws IOException{
            HashMap<String, String> result = new ObjectMapper().readValue(postData, HashMap.class);
            String iid = result.get("guserId");
            String imageData = result.get("photo");

        if(iid.contains("badge"))
        {
            imageData = imageData.substring(imageData.indexOf(",") + 1);
            byte[] decoded = Base64.getDecoder().decode(imageData);

            FileUtils.writeByteArrayToFile(new File("target/classes/static/images/" + iid + ".jpg"), decoded);
            return true;
        }

        if(gLoginRep.findByTokenAndLogin(token, gUserRep.findOne(Long.parseLong(iid)).getLogin()) != null) {

            imageData = imageData.substring(imageData.indexOf(",") + 1);
            byte[] decoded = Base64.getDecoder().decode(imageData);

            FileUtils.writeByteArrayToFile(new File("target/classes/static/images/" + iid + ".jpg"), decoded);
            return true;
        }
        else
            return false;
    }

    @RequestMapping("/api/gsettings/setdesc")
    public boolean desc(@RequestBody String postData, @RequestParam(value="token") String token) throws IOException{
            HashMap<String, String> result = new ObjectMapper().readValue(postData, HashMap.class);
            String guid = result.get("guserId");
            String desc = result.get("description");

            GUser updatedUser = gUserRep.findOne(Long.parseLong(guid));
        if(gLoginRep.findByTokenAndLogin(token, updatedUser.getLogin()) != null) {
            updatedUser.setDescription(desc);
            gUserRep.save(updatedUser);
            return true;
        }
        else
            return false;
    }
    @RequestMapping("/api/gsettings/setpass")
    public String pass(@RequestBody String postData, @RequestParam(value="token") String token) throws IOException{
            HashMap<String, String> result = new ObjectMapper().readValue(postData, HashMap.class);
            String login = result.get("login");
            String pass = result.get("password");
            String oldPass = result.get("oldPass");

        if(gLoginRep.findByTokenAndLogin(token, login) != null) {
            if(gLoginRep.findByLoginAndPassword(login,oldPass) == null)
                return new ObjectMapper().writeValueAsString("Niepoprawne hasło");
            GLogin updatedLogin = gLoginRep.findOne(login);
            updatedLogin.setPassword(pass);
            gLoginRep.save(updatedLogin);
            return new ObjectMapper().writeValueAsString("Hasło zostało zmienione");
        }
        return null;
    }

}
