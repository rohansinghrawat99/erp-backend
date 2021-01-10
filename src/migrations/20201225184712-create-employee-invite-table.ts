import Sequelize from "sequelize";

export = {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable("employee_invites", {
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
            employee_id: {
                allowNull: false,
                type: Sequelize.BIGINT
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
        return queryInterface.dropTable("employee_invites");
    }
};
