package com.koziejaj.client;
/**
 * Created by Jacek on 2017-02-24.
 */

import org.springframework.data.repository.CrudRepository;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Jacek on 18-12-2016.
 */
@RepositoryRestResource(collectionResourceRel = "GUserQs", path = "GUserQs")
public interface GUserQRepository extends CrudRepository<GUserQ, Long> {

    List<GUserQ> findByGuserId(@Param("guserId") Long guserId);
    @Transactional
    List<GUserQ> removeByGuserId(@Param("guserId") Long guserId);
    GUserQ findByGuserIdAndGquestId(Long guserId, Long gquestId);
}
