package com.techelevator.controller;

import com.techelevator.dao.BattleDao;
import com.techelevator.dao.MonsterDao;
import com.techelevator.model.*;
import com.techelevator.model.Character;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class AdminController {

    private final MonsterDao monsterDao;
    private final BattleDao battleDao;

    public AdminController(MonsterDao monsterDao, BattleDao battleDao)
    {
        this.monsterDao = monsterDao;
        this.battleDao = battleDao;
    }
    @ResponseStatus(HttpStatus.ACCEPTED)
    @RequestMapping(path="/adminMonsterPicks", method = RequestMethod.POST)
    public String startBattle(@RequestBody AdminMonsterPicksDTO adminMonsterPicksDTO)
    {
        String returnString = "Boom we made it";
        System.out.print(adminMonsterPicksDTO.toString());

        List<Monster> allMonsters = monsterDao.getAllMonsters();

        for (Monster monster : allMonsters) {
            monster.setActive(false);
            monsterDao.updateMonster(monster);
        }

        int[] selectedMonsterIds = {
                adminMonsterPicksDTO.getT1PickSlot1(),
                adminMonsterPicksDTO.getT1PickSlot2(),
                adminMonsterPicksDTO.getT1PickSlot3(),
                adminMonsterPicksDTO.getT2PickSlot1(),
                adminMonsterPicksDTO.getT2PickSlot2(),
                adminMonsterPicksDTO.getT2PickSlot3(),
                adminMonsterPicksDTO.getT3PickSlot1(),
                adminMonsterPicksDTO.getT3PickSlot2(),
                adminMonsterPicksDTO.getT3PickSlot3(),
                adminMonsterPicksDTO.getT4PickSlot1(),
                adminMonsterPicksDTO.getT4PickSlot2(),
                adminMonsterPicksDTO.getT4PickSlot3(),
        };

        for (int monsterId : selectedMonsterIds)
        {
            Monster monsterToUpdate =  monsterDao.getMonsterById(monsterId);
            monsterToUpdate.setActive(true);
            monsterDao.updateMonster(monsterToUpdate);
        }

        battleDao.deleteAllBattles();

        return "Selected Monster IDs activated: " + java.util.Arrays.toString(selectedMonsterIds);

    }

}
