import Sequelize from "sequelize";

export = {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable("subjects", {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.BIGINT
            },
            code: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable("subjects");
    }
};
