/*
Snippets for Onetap v3 - created by innocenthvh

Contacts
- Onetap Forum: https://www.onetap.com/members/innocenthvh.32884/
- Discord: xHeaven#2143
- Github: https://github.com/xHeaven
- Steam: https://steamcommunity.com/id/bodyscale

Please, if you plan to use my code, do not delete the credits. Thanks!
*/


/**
 * 
 * @param {entity} entity // The entity we want to check if the next shot on thorax/pelvis/body to it can be lethal.
 * @returns {boolean} // Returns true if the entity can be killed with the above hitboxes with one bullet.
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
 * @param {entity} entity // The entity we want to validate.
 * @returns {boolean} // If the entity is valid, returns true, otherwise false.
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
 * @param {entity} entity // The entity whom KDR we want to get.
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
 * @param {entity} entity // The entity we want to check if it is in the air.
 * @returns {boolean} // Returns true if the given entity is in the air, otherwise false.
 */
function IsInAir(entity) {
	var flags = Entity.GetProp(entity, "CBasePlayer", "m_fFlags");

	if (!(flags & 1 << 0) && !(flags & 1 << 0x12)) return true;
	else return false;
}

/**
 * 
 * @param {entity} entity // The entity we want to check if it is crouching.
 * @returns {boolean} // Returns true if the given entity is crouching, otherwise false.
 */
function IsCrouching(entity) {
	var flags = Entity.GetProp(entity, "CBasePlayer", "m_fFlags");

	if (flags & 1 << 1) return true;
	else return false;
}

/**
 * 
 * @param {entity} entity // The entity whom speed we want to get
 * @returns {float} // Returns the speed of the given entity
 */
function GetSpeed(entity) {
	var velocity = Entity.GetProp(entity, "CBasePlayer", "m_vecVelocity[0]");

	return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

/**
 * 
 * @param {entity} entity // The entity we want to check if it is standing.
 * @returns {boolean} // Returns true if the given entity is standing, otherwise false.
 */
function IsStanding(entity) {
	if (GetSpeed(entity) <= 5) return true;
	else return false;
}

/**
 * 
 * @param {entity} entity // The entity we want to check if it is slow walking.
 * @returns {boolean} // Returns true if the given entity is slow walking, otherwise false.
 */
function IsSlowWalking(entity) {
	var entitySpeed = GetSpeed(entity);

	if (entitySpeed >= 10 && entitySpeed <= 85) return true;
	else return false;
}

/**
 * 
 * @param {entity} entity // The entity we want to check if visible.
 * @param {integer/object} hitboxes // The hitboxes we want to check if visible on the given entity. It can be a single number, or an array of numbers.
 * @returns {boolean} // Returns true if at least one of the given hitbox(es) is/are visible on the given entity.
 */
function IsVisible(entity, hitboxes) {
	var localPlayer = Entity.GetLocalPlayer();
	var localPlayerEyePos = Entity.GetEyePosition(localPlayer);

	if (typeof (hitboxes) === "number") {
		var hitboxPos = Entity.GetHitboxPosition(entity, hitboxes);
		var trace = Trace.Line(localPlayer, localPlayerEyePos, hitboxPos);

		if (trace[1] > 0.9)
			return true;
	}

	if (typeof (hitboxes) === "object") {
		hitboxes.forEach(function (hitbox) {
			var hitboxPos = Entity.GetHitboxPosition(entity, hitbox);
			var trace = Trace.Line(localPlayer, localPlayerEyePos, hitboxPos);

			if (trace[1] > 0.9)
				return true;
		});
	}

	return false;
}
/**
 * 
 * @param {entity} entity // The entity we want to check if hittable.
 * @param {integer/object} hitboxes // The hitboxes we want to check if hittable on the given entity. It can be a single number, or an array of numbers.
 * @returns {object} // Returns an object that contains the following values: visible (bool), hittable (bool), damage (int), hitbox (int)
 */
function IsHittable(entity, hitboxes) {
	var localPlayer = Entity.GetLocalPlayer();
	var localPlayerEyePos = Entity.GetEyePosition(localPlayer);

	var result = {
		visible: false,
		hittable: false,
		damage: 0,
		hitbox: 0
	};

	if (typeof (hitboxes) === "number") {
		var hitboxPos = Entity.GetHitboxPosition(entity, hitboxes);
		var trace = Trace.Bullet(localPlayer, localPlayerEyePos, hitboxPos);
		var possibleDamage = trace[1];

		if (possibleDamage > result.damage) {
			result.visible = trace[2];
			result.hittable = true;
			result.damage = trace[1];
			result.hitbox = hitboxes;

			return result;
		}
	}

	if (typeof (hitboxes) === "object") {
		hitboxes.forEach(function (hitbox) {
			var hitboxPos = Entity.GetHitboxPosition(entity, hitbox);
			var trace = Trace.Bullet(localPlayer, localPlayerEyePos, hitboxPos);
			var possibleDamage = trace[1];

			if (possibleDamage > result.damage) {
				result.visible = trace[2];
				result.hittable = true;
				result.damage = trace[1];
				result.hitbox = hitbox;

				return result;
			}
		});
	}

	return result;
}

/**
 * Credits: edeen
 * @param {string} string // The formattable string
 * @param {object} values // The values in order to replace % charachters in the given string
 */
function format(string, values) {
	const array = string.split("%");
	const final_string = array[0];

	if (array.length - 1 != values.length)
		throw new Error("[Format] The amount of placeholders does not match the amount of values.");

	for (var i = 1; i < array.length; i++)
		final_string += values[i - 1] + array[i];

	return final_string;
}