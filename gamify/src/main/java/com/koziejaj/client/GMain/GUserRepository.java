package com.koziejaj.client.GMain;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Jacek on 18-12-2016.
 */
@RepositoryRestResource(collectionResourceRel = "GUsers", path = "GUsers")
public interface GUserRepository extends CrudRepository<GUser, Long> {

    GUser findByLogin(@Param("login") String login);

    GUser findByFirstName(@Param("firstName") String firstName);

    List<GUser> findByLastName(@Param("lastName") String lastName);
}
