import { QueryInterface } from 'sequelize';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface, dataTypes: any): Promise<void> => {
    
    // USER table
		await queryInterface.createTable(`USER`,{
      ID : {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      FIRST_NAME : {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      LAST_NAME : {
        type: dataTypes.STRING(255),
        allowNull: true,
      },
      PHONE_NUMBER : {
        type: dataTypes.STRING(10),
        allowNull: false,
      },
    });

    // SHOWROOM table
		await queryInterface.createTable(`SHOWROOM`,{
      ID : {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      NO_OF_SEATS_VIP : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      NO_OF_SEATS_COUPLE : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    });

    // MOVIE table
		await queryInterface.createTable(`MOVIE`,{
      ID : {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      NAME : {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      LANGUAGE : {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      GENERE : {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
    });
    
    // SHOW table
    await queryInterface.createTable(`SHOW`,{
      Index : {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      SHOW_TIME : {
        type: dataTypes.TIME,
        allowNull: false,
      },
      SHOW_DATE : {
        type: dataTypes.DATEONLY,
        allowNull: false,
      },
      SEATS_REMAINING_VIP : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      SEATS_REMAINING_COUPLE : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      CLASS_COST_VIP : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      CLASS_COST_COUPLE : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      SHOWROOM_ID : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      MOVIE_ID : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    });

    // BOOKING table
    await queryInterface.createTable(`BOOKING`,{
      ID : {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      NO_OF_TICKETS : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      TOTAL_COST : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      USER_ID : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      SHOWROOM_ID : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      SEAT_NUMBERS : {
        type: dataTypes.ARRAY(dataTypes.INTEGER),
        allowNull: false,
      },
    });

    // TICKET table
    await queryInterface.createTable(`TICKET`,{
      ID : {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      BOOKING_ID : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      CLASS : {
        type: dataTypes.STRING(3),
        allowNull: false,
      },
      PRICE : {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    });

    // Foreign Key Contraint
    await Promise.all([
      queryInterface.sequelize.query("ALTER SHOW ADD CONSTRAINT FK_SHOWROOM_ID FOREIGN KEY (SHOWROOM_ID) REFERENCES SHOWROOM(ID) ON DELETE CASCADE;"),
      queryInterface.sequelize.query("ALTER SHOW ADD CONSTRAINT FK_MOVIE_ID FOREIGN KEY (MOVIE_ID) REFERENCES MOVIE(ID) ON DELETE CASCADE;"),
      queryInterface.sequelize.query("ALTER BOOKING ADD CONSTRAINT FK_USER_ID FOREIGN KEY (USER_ID) REFERENCES USER(ID) ON DELETE CASCADE;"),
      queryInterface.sequelize.query("ALTER BOOKING ADD CONSTRAINT FK_SHOWROOM_ID FOREIGN KEY (SHOWROOM_ID) REFERENCES SHOWROOM(ID) ON DELETE CASCADE;"),
      queryInterface.sequelize.query("ALTER TICKET ADD CONSTRAINT FK_BOOKING_ID FOREIGN KEY (BOOKING_ID) REFERENCES BOOKING(ID) ON DELETE CASCADE;"),
    ]);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface: QueryInterface) => {
    await Promise.all([
      queryInterface.dropTable("USER"),
      queryInterface.dropTable("SHOWROOM"),
      queryInterface.dropTable("MOVIE"),
      queryInterface.dropTable("SHOW"),
      queryInterface.dropTable("BOOKING"),
      queryInterface.dropTable("TICKET"),
    ]);
  },
};
