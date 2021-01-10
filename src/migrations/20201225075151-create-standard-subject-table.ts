import Sequelize from "sequelize";

export = {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable("standard_subjects", {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.BIGINT
            },
            standard_id: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            subject_id: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            subject_teacher_id: {
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
        return queryInterface.dropTable("standard_subjects");
    }
};
