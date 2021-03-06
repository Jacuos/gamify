package com.koziejaj.client.GLogin;
/**
 * Created by Jacek on 2017-03-01.
 */
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Entity
public class GLogin {

    @Id
    private String login;
    private String password;
    private boolean isAdmin;
    private String email;
    private String token;

    public GLogin(){}
    public GLogin(String lo, String pa, String em) {
        login = lo;
        password = pa;
        email = em;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
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
}
