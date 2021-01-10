import Sequelize from "sequelize";
import { Helpers } from "../util/helpers.util";
import { EmployeeStatus, EmployeeType } from "../util/enum.util";

export = {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable("employees", {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.BIGINT
            },
            emp_id: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            first_name: {
                defaultValue: "first_name",
                allowNull: false,
                type: Sequelize.STRING
            },
            middle_name: {
                defaultValue: "middle_name",
                allowNull: true,
                type: Sequelize.STRING
            },
            last_name: {
                defaultValue: "last_name",
                allowNull: true,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            password: {
                defaultValue: "secret",
                allowNull: false,
                type: Sequelize.STRING
            },
            type: {
                allowNull: false,
                type: Sequelize.ENUM(...Helpers.iterateEnum<EmployeeType>(EmployeeType))
            },
            profile_pic_url: {
                allowNull: true,
                type: Sequelize.STRING
            },
            status: {
                defaultValue: EmployeeStatus.INVITED,
                allowNull: false,
                type: Sequelize.ENUM(...Helpers.iterateEnum<EmployeeStatus>(EmployeeStatus))
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
        return queryInterface.dropTable("employees");
    }
};
