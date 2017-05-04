package com.koziejaj.client.GLogin;

/**
 * Created by Jacek on 2017-05-03.
 */
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class GPassReset {

    @Id
    private String email;
    private String token;
    private Date reqDate;


    public GPassReset(){}
    public GPassReset(String em, String to, Date dd) {
        email = em;
        token = to;
        reqDate = dd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getReqDate() {return reqDate;}

    public void setReqDate(Date reqDate) {this.reqDate = reqDate;}
}
