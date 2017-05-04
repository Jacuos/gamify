package com.koziejaj.client.GLogin;

/**
 * Created by Jacek on 2017-05-03.
 */
import org.springframework.data.repository.CrudRepository;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Jacek on 18-12-2016.
 */
@RepositoryRestResource(collectionResourceRel = "GPassResets", path = "GPassResets")
public interface GPassResetRepository extends CrudRepository<GPassReset, String> {
    GPassReset findByEmailAndToken(String email, String token);
}
