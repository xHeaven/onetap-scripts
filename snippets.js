/**
 * 
 * @param {entity} entity // The entity we want to check if the next shot on thorax/pelvis/body to it can be lethal
 * @returns {boolean} // Returns true if the entity can be killed with the above hitboxes with one bullet
 */
function IsLethal(entity) {
	var entityHealth = Entity.GetProp(entity, "CBasePlayer", "m_iHealth");
	var localPlayer = Entity.GetLocalPlayer();
	var localPlayerEyePos = Entity.GetEyePosition(localPlayer);

	var pelvisPos = Entity.GetHitboxPosition(entity, 2);
	var bodyPos = Entity.GetHitboxPosition(entity, 3);
	var thoraxPos = Entity.GetHitboxPosition(entity, 4);

	var resultPelvis = Trace.Bullet(localPlayer, entity, localPlayerEyePos, pelvisPos);
	var resultBody = Trace.Bullet(localPlayer, entity, localPlayerEyePos, bodyPos);
	var resultThorax = Trace.Bullet(localPlayer, entity, localPlayerEyePos, thoraxPos);

	if (resultThorax[1] >= entityHealth) return true;
	if (resultPelvis[1] >= entityHealth) return true;
	if (resultBody[1] >= entityHealth) return true;

	return false;
}

/**
 * 
 * @param {entity} entity // The entity we want to validate
 * @returns {boolean} // If the entity is valid, returns true, otherwise false
 */
function CheckEntity(entity) {
	if (!Entity.IsValid(entity)) return false;
	if (!Entity.IsAlive(entity)) return false;
	if (!Entity.IsLocalPlayer(entity))
		if (Entity.IsDormant(entity)) return false;

	return true;
}

/**
 * 
 * @param {entity} entity // The entity whom KDR we want to get
 * @returns {float} // Returns the KDR of the given entity in the following format: 1.00
 */
function GetKDR(entity) {
	var kills = Entity.GetProp(entity, "CPlayerResource", "m_iKills");
	var deaths = Entity.GetProp(entity, "CPlayerResource", "m_iDeaths");

	if (deaths != 0) {
		return (kills / deaths).toFixed(2);
	} else {
		return kills.toFixed(2)
	}
}

/**
 * 
 * @param {entity} entity // The entity we want to check if it is in the air
 * @returns {boolean} // Returns true if the given entity is in the air, otherwise false
 */
function IsInAir(entity) {
	var flags = Entity.GetProp(entity, "CBasePlayer", "m_fFlags");
	if (!(flags & 1 << 0) && !(flags & 1 << 0x12)) return true;
	else return false;
}

/**
 * 
 * @param {entity} entity // The entity we want to check if it is crouching
 * @returns {boolean} // Returns true if the given entity is crouching, otherwise false
 */
function IsCrouching(entity) {
	var flags = Entity.GetProp(entity, "CBasePlayer", "m_fFlags");
	if (flags & 1 << 1) return true;
	else return false;
}

/**
 * 
 * @param {entity} entity // The entity we want to check if it is standing
 * @returns {boolean} // Returns true if the given entity is standing, otherwise false
 */
function IsStanding(entity) {
	var entityVelocity = Entity.GetProp(entity, "CBasePlayer", "m_vecVelocity[0]");
	var entitySpeed = Math.sqrt(entityVelocity[0] * entityVelocity[0] + entityVelocity[1] * entityVelocity[1]);
	if (entitySpeed <= 5) return true;
	else return false;
}

/**
 * 
 * @param {entity} entity // The entity we want to check if it is slow walking
 * @returns {boolean} // Returns true if the given entity is slow walking, otherwise false
 */
function IsSlowWalking(entity) {
	var entityVelocity = Entity.GetProp(entity, "CBasePlayer", "m_vecVelocity[0]");
	var entitySpeed = Math.sqrt(entityVelocity[0] * entityVelocity[0] + entityVelocity[1] * entityVelocity[1]);
	if (entitySpeed >= 10 && entitySpeed <= 85) return true;
	else return false;
}