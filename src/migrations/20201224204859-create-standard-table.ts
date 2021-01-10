import Sequelize from "sequelize";

export = {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable("standards", {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.BIGINT
            },
            name: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            class_teacher_id: {
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
        return queryInterface.dropTable("standards");
    }
};
