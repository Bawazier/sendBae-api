'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("Countries", [
      {
        name: "Indonesia",
        code: "+62",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Afganistan",
        code: "+93",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Albania",
        code: "+355",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Algeria",
        code: "+213",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Argentina",
        code: "+54",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Australia",
        code: "+61",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Austria",
        code: "+43",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bangladesh",
        code: "+880",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Brunei Darussalam",
        code: "+62",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Canada",
        code: "+1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Egypt",
        code: "+20",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "France",
        code: "+33",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Germany",
        code: "+49",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hong Kong",
        code: "+852",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "India",
        code: "+91",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Iran",
        code: "+98",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Japan",
        code: "+81",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Laos",
        code: "+856",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Malaysia",
        code: "+60",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Myanmar",
        code: "+95",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Palestine",
        code: "+970",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "United Arab Emirates",
        code: "+971",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
