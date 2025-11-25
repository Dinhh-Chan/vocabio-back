"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "User",
            {
                _id: {
                    type: Sequelize.STRING(255),
                    primaryKey: true,
                    allowNull: false,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    validate: {
                        isEmail: true,
                    },
                },
                firstname: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                lastname: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                fullname: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                gender: {
                    type: Sequelize.ENUM("Female", "Male"),
                    allowNull: true,
                },
                dob: {
                    type: Sequelize.STRING(10),
                    allowNull: true,
                },
                ssoId: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                systemRole: {
                    type: Sequelize.ENUM("Admin", "User"),
                    allowNull: false,
                },
                dataPartitionCode: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            },
            {
                schema: "public",
            },
        );

        // Tạo indexes
        await queryInterface.addIndex("User", ["dataPartitionCode"], {
            name: "user_data_partition_code_idx",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("User");
    },
};

