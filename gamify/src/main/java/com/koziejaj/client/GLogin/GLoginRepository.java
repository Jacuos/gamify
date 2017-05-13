package com.koziejaj.client.GLogin;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Jacek on 18-12-2016.
 */
@RepositoryRestResource(collectionResourceRel = "GLogins", path = "GLogins")
public interface GLoginRepository extends CrudRepository<GLogin, String> {
    GLogin findByLoginAndPassword(String login, String password);
    GLogin findByLogin(String login);
    List<GLogin> findByEmail(String email);

    GLogin findByToken(String token);
    GLogin findByTokenAndLogin(String token, String login);
    GLogin findByTokenAndIsAdmin(String token, boolean isAdmin);
}
