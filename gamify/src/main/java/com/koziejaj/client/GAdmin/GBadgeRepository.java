package com.koziejaj.client.GAdmin;

import org.springframework.data.repository.CrudRepository;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Jacek on 18-12-2016.
 */
@RepositoryRestResource(collectionResourceRel = "GBadges", path = "GBadges")
public interface GBadgeRepository extends CrudRepository<GBadge, String> {
    List<GBadge> findByLogin( String login);
    @Transactional
    List<GBadge> removeByBadge(@Param("badge") String badge);
}
