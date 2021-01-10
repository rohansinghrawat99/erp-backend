import Sequelize from "sequelize";
import { Helpers } from "../util/helpers.util";
import { EmployeeType, House } from "../util/enum.util";

export = {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable("students", {
            id: {
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                type: Sequelize.BIGINT
            },
            admission_number: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            first_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            middle_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            last_name: {
                allowNull: true,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            standard_id: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            house: {
                allowNull: true,
                type: Sequelize.ENUM(...Helpers.iterateEnum<House>(House))
            },
            profile_pic_url: {
                allowNull: true,
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
        return queryInterface.dropTable("students");
    }
};
