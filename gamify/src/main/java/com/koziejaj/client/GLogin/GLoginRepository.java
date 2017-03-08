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

}
