package com.koziejaj.client.GSecurity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Jacek on 2017-05-11.
 */
@RepositoryRestResource(collectionResourceRel = "GTokens", path = "GTokens")
public interface GTokenRepository extends CrudRepository<GToken, String> {

    GToken findByLoginAndToken(String login, String token);
}
