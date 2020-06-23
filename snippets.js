// Checks if the next shot on body can be lethal to the given enemy, returns true if so, otherwise returns false.
function IsLethal(enemy) {
	var enemyHealth = Entity.GetProp(enemy, "CBasePlayer", "m_iHealth");
	var localPlayer = Entity.GetLocalPlayer();
	var localPlayerEyePos = Entity.GetEyePosition(localPlayer);

	var pelvisPos = Entity.GetHitboxPosition(enemy, 2);
	var bodyPos = Entity.GetHitboxPosition(enemy, 3);
	var thoraxPos = Entity.GetHitboxPosition(enemy, 4);

	var resultPelvis = Trace.Bullet(localPlayer, enemy, localPlayerEyePos, pelvisPos);
	var resultBody = Trace.Bullet(localPlayer, enemy, localPlayerEyePos, bodyPos);
	var resultThorax = Trace.Bullet(localPlayer, enemy, localPlayerEyePos, thoraxPos);

	if (resultThorax[1] >= enemyHealth) return true;
	if (resultPelvis[1] >= enemyHealth) return true;
	if (resultBody[1] >= enemyHealth) return true;

	return false;
}

// Checks the validity of the given entity. The second argument is optional, false if the given entity is not the local player.
function CheckEntity(entity, local = true) {
	if (local) {
		if (!Entity.IsValid(entity)) return false;
		if (!Entity.IsAlive(entity)) return false;
	} else {
		if (!Entity.IsValid(entity)) return false;
		if (!Entity.IsAlive(entity)) return false;
		if (Entity.IsDormant(entity)) return false;
	}

	return true;
}