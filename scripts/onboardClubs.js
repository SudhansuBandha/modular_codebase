const { UsersFactory } = require("../apis/domains/v1/users/dal");
const { ClubsFactory } = require("../apis/domains/v1/clubs/dal");

const usersManager = new UsersFactory();
const clubsManager = new ClubsFactory();

const clubs = require("../_data/clubs");

(async () => {
  try {
    const users = await usersManager.getAll();

    const usersMap = {};

    for (const user of users) {
      usersMap[user.name] = user._id;
    }

    for (const club of clubs) {
      // Ensure each club has a valid createdBy reference
      club.members = club.members.map((member) => usersMap[member]);
      club.owners = club.owners.map((owner) => usersMap[owner]);
    }

    const result = await clubsManager.createMany(clubs);
    console.log("Clubs onboarded successfully:", result);
  } catch (err) {
    console.error("Error onboarding users:", err.message);
  } finally {
    process.exit(0);
  }
})();
