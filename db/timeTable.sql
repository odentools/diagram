/*
Navicat MySQL Data Transfer

Source Server         : そるとさん
Source Server Version : 50544
Source Host           : oecu.pw:3306
Source Database       : timeTable

Target Server Type    : MYSQL
Target Server Version : 50544
File Encoding         : 65001

Date: 2015-10-11 17:45:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `Bus`
-- ----------------------------
DROP TABLE IF EXISTS `Bus`;
CREATE TABLE `Bus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `diaId` int(11) NOT NULL COMMENT 'ダイアテーブルID',
  `departureTime` time NOT NULL COMMENT '出発時刻',
  `arrivalTime` time NOT NULL COMMENT '到着時刻',
  `note` mediumtext COMMENT '備考',
  PRIMARY KEY (`id`),
  KEY `diaId` (`diaId`),
  CONSTRAINT `Bus_ibfk_1` FOREIGN KEY (`diaId`) REFERENCES `Dia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=440 DEFAULT CHARSET=utf8 COMMENT='便テーブル';

-- ----------------------------
-- Records of Bus
-- ----------------------------
INSERT INTO `Bus` VALUES ('1', '1', '08:30:00', '08:50:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('2', '1', '08:40:00', '09:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('3', '1', '09:00:00', '09:20:00', null);
INSERT INTO `Bus` VALUES ('4', '1', '09:05:00', '09:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('5', '1', '09:40:00', '10:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('6', '1', '10:20:00', '10:40:00', null);
INSERT INTO `Bus` VALUES ('7', '1', '10:40:00', '11:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('8', '1', '11:20:00', '11:40:00', null);
INSERT INTO `Bus` VALUES ('9', '1', '11:40:00', '12:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('10', '1', '12:20:00', '12:40:00', null);
INSERT INTO `Bus` VALUES ('11', '1', '12:40:00', '13:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('12', '1', '13:00:00', '13:20:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('13', '1', '13:20:00', '13:40:00', null);
INSERT INTO `Bus` VALUES ('14', '1', '13:40:00', '14:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('15', '1', '14:20:00', '14:40:00', null);
INSERT INTO `Bus` VALUES ('16', '1', '14:40:00', '15:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('17', '1', '15:20:00', '15:40:00', null);
INSERT INTO `Bus` VALUES ('18', '1', '15:40:00', '16:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('19', '1', '16:20:00', '16:40:00', null);
INSERT INTO `Bus` VALUES ('20', '1', '16:40:00', '17:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('21', '1', '17:20:00', '17:40:00', null);
INSERT INTO `Bus` VALUES ('22', '1', '17:40:00', '18:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('23', '1', '18:20:00', '18:40:00', null);
INSERT INTO `Bus` VALUES ('24', '1', '18:40:00', '19:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('25', '1', '19:05:00', '19:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('26', '1', '19:40:00', '20:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('27', '1', '20:05:00', '20:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('28', '1', '20:40:00', '21:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('75', '4', '10:05:00', '10:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('76', '4', '11:05:00', '11:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('77', '4', '12:05:00', '12:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('78', '4', '13:05:00', '13:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('79', '4', '14:05:00', '14:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('80', '4', '15:05:00', '15:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('81', '4', '16:05:00', '16:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('82', '4', '17:10:00', '17:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('83', '4', '18:05:00', '18:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('84', '4', '19:05:00', '19:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('85', '4', '20:05:00', '20:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('86', '4', '21:05:00', '21:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('87', '3', '09:10:00', '09:30:00', null);
INSERT INTO `Bus` VALUES ('88', '3', '09:50:00', '10:10:00', null);
INSERT INTO `Bus` VALUES ('89', '3', '10:10:00', '10:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('90', '3', '10:50:00', '11:10:00', null);
INSERT INTO `Bus` VALUES ('91', '3', '11:10:00', '11:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('92', '3', '11:30:00', '11:50:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('93', '3', '11:50:00', '12:10:00', null);
INSERT INTO `Bus` VALUES ('94', '3', '12:10:00', '12:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('95', '3', '12:50:00', '13:10:00', null);
INSERT INTO `Bus` VALUES ('96', '3', '13:10:00', '13:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('97', '3', '13:50:00', '14:10:00', null);
INSERT INTO `Bus` VALUES ('98', '3', '14:10:00', '14:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('99', '3', '14:50:00', '15:10:00', null);
INSERT INTO `Bus` VALUES ('100', '3', '15:10:00', '15:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('101', '3', '15:20:00', '15:40:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('102', '3', '15:50:00', '16:10:00', null);
INSERT INTO `Bus` VALUES ('103', '3', '16:05:00', '16:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('104', '3', '16:42:00', '17:02:00', null);
INSERT INTO `Bus` VALUES ('105', '3', '16:50:00', '17:10:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('106', '3', '16:55:00', '17:15:00', null);
INSERT INTO `Bus` VALUES ('107', '3', '17:00:00', '17:20:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('108', '3', '17:05:00', '17:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('109', '3', '17:50:00', '18:10:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('110', '3', '18:05:00', '18:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('111', '3', '18:35:00', '18:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('112', '3', '18:50:00', '19:10:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('113', '3', '19:05:00', '19:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('114', '3', '19:35:00', '19:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('115', '3', '19:50:00', '20:10:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('116', '3', '20:05:00', '20:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('117', '3', '20:35:00', '20:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('118', '3', '21:05:00', '21:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('119', '2', '08:30:00', '08:50:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('120', '2', '09:05:00', '09:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('121', '2', '09:40:00', '10:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('122', '2', '10:35:00', '10:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('123', '2', '11:35:00', '11:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('124', '2', '12:35:00', '12:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('125', '2', '13:35:00', '13:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('126', '2', '14:35:00', '14:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('127', '2', '15:35:00', '15:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('128', '2', '16:35:00', '16:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('129', '2', '17:35:00', '17:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('130', '2', '18:35:00', '18:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('131', '2', '19:35:00', '19:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('132', '2', '20:35:00', '20:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('133', '5', '08:30:00', '08:50:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('134', '5', '09:00:00', '09:20:00', null);
INSERT INTO `Bus` VALUES ('135', '5', '09:05:00', '09:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('136', '5', '09:10:00', '09:30:00', null);
INSERT INTO `Bus` VALUES ('137', '5', '09:40:00', '10:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('138', '5', '10:20:00', '10:40:00', null);
INSERT INTO `Bus` VALUES ('139', '5', '10:35:00', '10:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('140', '5', '11:35:00', '11:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('141', '5', '12:35:00', '12:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('142', '5', '13:00:00', '13:20:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('143', '5', '13:35:00', '13:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('144', '5', '14:35:00', '14:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('145', '5', '15:35:00', '15:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('146', '5', '16:35:00', '16:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('147', '5', '17:35:00', '17:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('148', '5', '18:35:00', '18:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('149', '5', '19:35:00', '19:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('150', '5', '20:35:00', '20:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('151', '6', '10:05:00', '10:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('152', '6', '11:05:00', '11:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('153', '6', '12:05:00', '12:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('154', '6', '12:50:00', '13:10:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('155', '6', '13:05:00', '13:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('156', '6', '14:05:00', '14:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('157', '6', '15:05:00', '15:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('158', '6', '15:20:00', '15:40:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('159', '6', '16:05:00', '16:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('160', '6', '16:50:00', '17:10:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('161', '6', '17:10:00', '17:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('162', '6', '18:05:00', '18:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('163', '6', '19:05:00', '19:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('164', '6', '20:05:00', '20:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('165', '6', '21:05:00', '21:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('166', '7', '08:23:00', '08:36:00', null);
INSERT INTO `Bus` VALUES ('167', '7', '08:57:00', '09:10:00', null);
INSERT INTO `Bus` VALUES ('168', '7', '09:46:00', '09:59:00', null);
INSERT INTO `Bus` VALUES ('169', '7', '11:40:00', '11:53:00', null);
INSERT INTO `Bus` VALUES ('170', '7', '12:10:00', '12:23:00', null);
INSERT INTO `Bus` VALUES ('171', '7', '15:10:00', '15:23:00', '清滝団地経由しない');
INSERT INTO `Bus` VALUES ('172', '7', '15:20:00', '15:33:00', '清滝団地経由しない');
INSERT INTO `Bus` VALUES ('173', '7', '16:10:00', '16:23:00', null);
INSERT INTO `Bus` VALUES ('174', '7', '16:30:00', '16:43:00', null);
INSERT INTO `Bus` VALUES ('175', '8', '08:23:00', '08:36:00', null);
INSERT INTO `Bus` VALUES ('176', '8', '08:40:00', '08:53:00', null);
INSERT INTO `Bus` VALUES ('177', '8', '08:47:00', '09:02:00', null);
INSERT INTO `Bus` VALUES ('178', '8', '08:57:00', '09:12:00', null);
INSERT INTO `Bus` VALUES ('179', '8', '09:14:00', '09:27:00', '清滝団地非経由');
INSERT INTO `Bus` VALUES ('180', '8', '09:33:00', '09:48:00', null);
INSERT INTO `Bus` VALUES ('181', '8', '09:46:00', '10:01:00', null);
INSERT INTO `Bus` VALUES ('182', '8', '10:05:00', '10:20:00', null);
INSERT INTO `Bus` VALUES ('183', '8', '10:22:00', '10:37:00', null);
INSERT INTO `Bus` VALUES ('184', '8', '10:52:00', '11:07:00', null);
INSERT INTO `Bus` VALUES ('185', '8', '11:20:00', '11:35:00', null);
INSERT INTO `Bus` VALUES ('186', '8', '11:40:00', '11:55:00', null);
INSERT INTO `Bus` VALUES ('187', '8', '11:50:00', '12:05:00', null);
INSERT INTO `Bus` VALUES ('188', '8', '12:10:00', '12:25:00', null);
INSERT INTO `Bus` VALUES ('189', '8', '12:37:00', '13:03:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('190', '8', '13:04:00', '13:19:00', null);
INSERT INTO `Bus` VALUES ('191', '8', '13:44:00', '13:59:00', null);
INSERT INTO `Bus` VALUES ('192', '8', '14:20:00', '14:46:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('193', '8', '14:45:00', '15:00:00', null);
INSERT INTO `Bus` VALUES ('194', '8', '15:10:00', '15:23:00', '清滝団地非経由');
INSERT INTO `Bus` VALUES ('195', '8', '15:20:00', '15:33:00', '清滝団地非経由');
INSERT INTO `Bus` VALUES ('196', '8', '15:24:00', '15:50:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('197', '8', '15:49:00', '16:02:00', '清滝団地非経由');
INSERT INTO `Bus` VALUES ('198', '8', '16:10:00', '16:25:00', null);
INSERT INTO `Bus` VALUES ('199', '8', '16:30:00', '16:45:00', null);
INSERT INTO `Bus` VALUES ('200', '8', '16:50:00', '17:03:00', '清滝団地非経由');
INSERT INTO `Bus` VALUES ('201', '8', '17:07:00', '17:20:00', null);
INSERT INTO `Bus` VALUES ('202', '8', '17:11:00', '17:37:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('203', '8', '17:35:00', '17:50:00', null);
INSERT INTO `Bus` VALUES ('204', '8', '18:00:00', '18:26:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('205', '8', '18:37:00', '18:52:00', null);
INSERT INTO `Bus` VALUES ('206', '8', '18:49:00', '19:14:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('207', '8', '19:54:00', '20:08:00', null);
INSERT INTO `Bus` VALUES ('244', '13', '09:30:00', '09:50:00', '');
INSERT INTO `Bus` VALUES ('245', '13', '09:40:00', '10:00:00', '');
INSERT INTO `Bus` VALUES ('246', '13', '10:40:00', '11:00:00', '');
INSERT INTO `Bus` VALUES ('247', '13', '11:40:00', '12:00:00', '');
INSERT INTO `Bus` VALUES ('248', '13', '12:40:00', '13:00:00', '');
INSERT INTO `Bus` VALUES ('249', '13', '13:40:00', '14:00:00', '');
INSERT INTO `Bus` VALUES ('250', '13', '14:40:00', '15:00:00', '');
INSERT INTO `Bus` VALUES ('251', '13', '15:40:00', '16:00:00', '');
INSERT INTO `Bus` VALUES ('252', '13', '16:40:00', '17:00:00', '');
INSERT INTO `Bus` VALUES ('253', '13', '17:40:00', '18:00:00', '');
INSERT INTO `Bus` VALUES ('254', '14', '10:10:00', '10:30:00', '');
INSERT INTO `Bus` VALUES ('255', '14', '11:10:00', '11:30:00', '');
INSERT INTO `Bus` VALUES ('256', '14', '12:10:00', '12:30:00', '');
INSERT INTO `Bus` VALUES ('257', '14', '13:10:00', '13:30:00', '');
INSERT INTO `Bus` VALUES ('258', '14', '14:10:00', '14:30:00', '');
INSERT INTO `Bus` VALUES ('259', '14', '15:10:00', '15:30:00', '');
INSERT INTO `Bus` VALUES ('260', '14', '16:10:00', '16:30:00', '');
INSERT INTO `Bus` VALUES ('261', '14', '17:10:00', '17:30:00', '');
INSERT INTO `Bus` VALUES ('262', '14', '17:30:00', '17:50:00', '');
INSERT INTO `Bus` VALUES ('263', '14', '17:50:00', '18:10:00', '');
INSERT INTO `Bus` VALUES ('264', '14', '18:10:00', '18:30:00', '');
INSERT INTO `Bus` VALUES ('265', '15', '09:30:00', '09:45:00', '');
INSERT INTO `Bus` VALUES ('266', '15', '10:00:00', '10:15:00', '');
INSERT INTO `Bus` VALUES ('267', '15', '10:30:00', '10:45:00', '');
INSERT INTO `Bus` VALUES ('268', '15', '11:00:00', '11:15:00', '');
INSERT INTO `Bus` VALUES ('269', '15', '11:30:00', '11:45:00', '2台待機');
INSERT INTO `Bus` VALUES ('270', '15', '12:00:00', '12:15:00', '2台待機');
INSERT INTO `Bus` VALUES ('271', '15', '12:30:00', '12:45:00', '');
INSERT INTO `Bus` VALUES ('272', '15', '13:00:00', '13:15:00', '');
INSERT INTO `Bus` VALUES ('273', '15', '13:30:00', '13:45:00', '');
INSERT INTO `Bus` VALUES ('274', '15', '14:00:00', '14:15:00', '');
INSERT INTO `Bus` VALUES ('275', '15', '14:30:00', '14:45:00', '');
INSERT INTO `Bus` VALUES ('276', '15', '15:00:00', '15:15:00', '');
INSERT INTO `Bus` VALUES ('277', '15', '15:30:00', '15:45:00', '');
INSERT INTO `Bus` VALUES ('278', '15', '16:00:00', '16:15:00', '');
INSERT INTO `Bus` VALUES ('279', '15', '16:30:00', '16:45:00', '');
INSERT INTO `Bus` VALUES ('280', '15', '17:00:00', '17:15:00', '');
INSERT INTO `Bus` VALUES ('281', '15', '17:30:00', '17:45:00', '');
INSERT INTO `Bus` VALUES ('282', '15', '18:00:00', '18:15:00', '');
INSERT INTO `Bus` VALUES ('283', '16', '10:00:00', '10:15:00', '');
INSERT INTO `Bus` VALUES ('284', '16', '10:30:00', '10:45:00', '');
INSERT INTO `Bus` VALUES ('285', '16', '11:00:00', '11:15:00', '');
INSERT INTO `Bus` VALUES ('286', '16', '11:30:00', '11:45:00', '');
INSERT INTO `Bus` VALUES ('287', '16', '12:00:00', '12:15:00', '');
INSERT INTO `Bus` VALUES ('288', '16', '12:30:00', '12:45:00', '');
INSERT INTO `Bus` VALUES ('289', '16', '13:00:00', '13:15:00', '');
INSERT INTO `Bus` VALUES ('290', '16', '13:30:00', '13:45:00', '');
INSERT INTO `Bus` VALUES ('291', '16', '14:00:00', '14:15:00', '');
INSERT INTO `Bus` VALUES ('292', '16', '14:30:00', '14:45:00', '');
INSERT INTO `Bus` VALUES ('293', '16', '15:00:00', '15:15:00', '');
INSERT INTO `Bus` VALUES ('294', '16', '15:30:00', '15:45:00', '');
INSERT INTO `Bus` VALUES ('295', '16', '16:00:00', '16:15:00', '');
INSERT INTO `Bus` VALUES ('296', '16', '16:30:00', '16:45:00', '');
INSERT INTO `Bus` VALUES ('297', '16', '17:00:00', '17:15:00', '');
INSERT INTO `Bus` VALUES ('298', '16', '17:30:00', '17:45:00', '2台待機');
INSERT INTO `Bus` VALUES ('299', '16', '18:00:00', '18:15:00', '');
INSERT INTO `Bus` VALUES ('300', '16', '18:30:00', '18:45:00', '');
INSERT INTO `Bus` VALUES ('301', '17', '08:30:00', '08:50:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('302', '17', '09:00:00', '09:20:00', '');
INSERT INTO `Bus` VALUES ('303', '17', '09:05:00', '09:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('304', '17', '09:10:00', '09:30:00', '');
INSERT INTO `Bus` VALUES ('305', '17', '09:40:00', '10:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('306', '17', '10:20:00', '10:40:00', '');
INSERT INTO `Bus` VALUES ('307', '17', '10:35:00', '10:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('308', '17', '11:35:00', '11:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('309', '17', '12:35:00', '12:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('310', '17', '13:00:00', '13:20:00', '');
INSERT INTO `Bus` VALUES ('311', '17', '13:35:00', '13:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('312', '17', '14:35:00', '14:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('313', '17', '15:35:00', '15:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('314', '17', '16:35:00', '16:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('315', '17', '17:35:00', '17:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('316', '17', '18:35:00', '18:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('317', '17', '19:35:00', '19:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('318', '17', '20:35:00', '20:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('319', '18', '10:05:00', '10:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('320', '18', '11:05:00', '11:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('321', '18', '12:05:00', '12:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('322', '18', '12:50:00', '13:10:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('323', '18', '13:05:00', '13:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('324', '18', '14:05:00', '14:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('325', '18', '15:05:00', '15:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('326', '18', '15:20:00', '15:40:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('327', '18', '16:05:00', '16:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('328', '18', '16:50:00', '17:10:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('329', '18', '17:10:00', '17:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('330', '18', '18:05:00', '18:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('331', '18', '19:05:00', '19:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('332', '18', '20:05:00', '20:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('333', '18', '21:05:00', '21:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('334', '19', '08:30:00', '08:50:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('335', '19', '09:05:00', '09:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('336', '19', '09:40:00', '10:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('337', '19', '10:25:00', '10:45:00', '');
INSERT INTO `Bus` VALUES ('338', '19', '10:35:00', '10:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('339', '19', '11:35:00', '11:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('340', '19', '12:20:00', '12:40:00', '');
INSERT INTO `Bus` VALUES ('341', '19', '12:35:00', '12:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('342', '19', '13:35:00', '13:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('343', '19', '14:35:00', '14:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('344', '19', '15:35:00', '15:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('345', '19', '16:35:00', '16:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('346', '19', '17:35:00', '17:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('347', '19', '18:35:00', '18:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('348', '19', '19:35:00', '19:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('349', '19', '20:35:00', '20:55:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('350', '20', '10:05:00', '10:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('351', '20', '11:05:00', '11:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('352', '20', '12:05:00', '12:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('353', '20', '13:05:00', '13:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('354', '20', '14:00:00', '14:20:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('355', '20', '14:05:00', '14:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('356', '20', '15:05:00', '15:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('357', '20', '15:20:00', '15:40:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('358', '20', '16:05:00', '16:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('359', '20', '17:10:00', '17:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('360', '20', '18:05:00', '18:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('361', '20', '19:05:00', '19:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('362', '20', '20:05:00', '20:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('363', '20', '21:05:00', '21:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('364', '21', '09:00:00', '09:15:00', '');
INSERT INTO `Bus` VALUES ('365', '21', '09:30:00', '09:45:00', '');
INSERT INTO `Bus` VALUES ('366', '21', '10:00:00', '10:15:00', '');
INSERT INTO `Bus` VALUES ('367', '21', '10:30:00', '10:45:00', '');
INSERT INTO `Bus` VALUES ('368', '21', '11:00:00', '11:15:00', '');
INSERT INTO `Bus` VALUES ('369', '21', '11:30:00', '11:45:00', '');
INSERT INTO `Bus` VALUES ('370', '21', '11:40:00', '11:55:00', '');
INSERT INTO `Bus` VALUES ('371', '21', '11:50:00', '12:05:00', '');
INSERT INTO `Bus` VALUES ('372', '21', '12:00:00', '12:15:00', '');
INSERT INTO `Bus` VALUES ('373', '21', '12:10:00', '12:25:00', '');
INSERT INTO `Bus` VALUES ('374', '21', '12:20:00', '12:35:00', '');
INSERT INTO `Bus` VALUES ('375', '21', '12:30:00', '12:45:00', '');
INSERT INTO `Bus` VALUES ('376', '21', '12:40:00', '12:55:00', '');
INSERT INTO `Bus` VALUES ('377', '21', '12:50:00', '13:05:00', '');
INSERT INTO `Bus` VALUES ('378', '21', '13:00:00', '13:15:00', '');
INSERT INTO `Bus` VALUES ('379', '21', '13:15:00', '13:30:00', '');
INSERT INTO `Bus` VALUES ('380', '21', '13:30:00', '13:45:00', '');
INSERT INTO `Bus` VALUES ('381', '21', '14:00:00', '14:15:00', '');
INSERT INTO `Bus` VALUES ('382', '21', '14:30:00', '14:45:00', '');
INSERT INTO `Bus` VALUES ('383', '21', '15:00:00', '15:15:00', '');
INSERT INTO `Bus` VALUES ('384', '21', '15:30:00', '15:45:00', '');
INSERT INTO `Bus` VALUES ('385', '21', '16:00:00', '16:15:00', '');
INSERT INTO `Bus` VALUES ('386', '21', '16:30:00', '16:45:00', '');
INSERT INTO `Bus` VALUES ('387', '21', '17:00:00', '17:15:00', '');
INSERT INTO `Bus` VALUES ('388', '21', '17:30:00', '17:45:00', '');
INSERT INTO `Bus` VALUES ('389', '22', '09:30:00', '09:45:00', '');
INSERT INTO `Bus` VALUES ('390', '22', '10:00:00', '10:15:00', '');
INSERT INTO `Bus` VALUES ('391', '22', '10:30:00', '10:45:00', '');
INSERT INTO `Bus` VALUES ('392', '22', '11:00:00', '11:15:00', '');
INSERT INTO `Bus` VALUES ('393', '22', '11:30:00', '11:45:00', '');
INSERT INTO `Bus` VALUES ('394', '22', '12:00:00', '12:15:00', '');
INSERT INTO `Bus` VALUES ('395', '22', '12:30:00', '12:45:00', '');
INSERT INTO `Bus` VALUES ('396', '22', '13:00:00', '13:15:00', '');
INSERT INTO `Bus` VALUES ('397', '22', '13:30:00', '13:45:00', '');
INSERT INTO `Bus` VALUES ('398', '22', '14:00:00', '14:15:00', '');
INSERT INTO `Bus` VALUES ('399', '22', '14:15:00', '14:30:00', '');
INSERT INTO `Bus` VALUES ('400', '22', '14:30:00', '14:45:00', '');
INSERT INTO `Bus` VALUES ('401', '22', '14:45:00', '15:00:00', '');
INSERT INTO `Bus` VALUES ('402', '22', '15:00:00', '15:15:00', '');
INSERT INTO `Bus` VALUES ('403', '22', '15:15:00', '15:30:00', '');
INSERT INTO `Bus` VALUES ('404', '22', '15:30:00', '15:45:00', '');
INSERT INTO `Bus` VALUES ('405', '22', '15:45:00', '16:00:00', '');
INSERT INTO `Bus` VALUES ('406', '22', '15:55:00', '16:10:00', '');
INSERT INTO `Bus` VALUES ('407', '22', '16:05:00', '16:20:00', '');
INSERT INTO `Bus` VALUES ('408', '22', '16:15:00', '16:30:00', '');
INSERT INTO `Bus` VALUES ('409', '22', '16:30:00', '16:45:00', '');
INSERT INTO `Bus` VALUES ('410', '22', '16:45:00', '17:00:00', '');
INSERT INTO `Bus` VALUES ('411', '22', '17:00:00', '17:15:00', '');
INSERT INTO `Bus` VALUES ('412', '22', '17:20:00', '17:35:00', '');
INSERT INTO `Bus` VALUES ('413', '22', '17:40:00', '17:55:00', '');
INSERT INTO `Bus` VALUES ('414', '22', '18:00:00', '18:15:00', '');
INSERT INTO `Bus` VALUES ('415', '22', '18:20:00', '18:35:00', '');
INSERT INTO `Bus` VALUES ('416', '23', '08:30:00', '08:50:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('417', '23', '09:05:00', '09:25:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('418', '23', '09:45:00', '10:05:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('419', '23', '10:40:00', '11:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('420', '23', '11:40:00', '12:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('421', '23', '12:40:00', '13:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('422', '23', '13:40:00', '14:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('423', '23', '14:40:00', '15:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('424', '23', '15:40:00', '16:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('425', '23', '16:40:00', '17:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('426', '23', '17:40:00', '18:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('427', '23', '18:40:00', '19:00:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('428', '24', '10:10:00', '10:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('429', '24', '11:10:00', '11:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('430', '24', '12:10:00', '12:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('431', '24', '13:10:00', '13:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('432', '24', '14:10:00', '14:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('433', '24', '15:10:00', '15:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('434', '24', '16:10:00', '16:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('435', '24', '17:10:00', '17:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('436', '24', '17:25:00', '17:45:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('437', '24', '18:10:00', '18:30:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('438', '24', '18:20:00', '18:40:00', '忍ケ丘経由');
INSERT INTO `Bus` VALUES ('439', '24', '19:10:00', '19:30:00', '忍ケ丘経由');

-- ----------------------------
-- Table structure for `Dia`
-- ----------------------------
DROP TABLE IF EXISTS `Dia`;
CREATE TABLE `Dia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `routeId` int(11) NOT NULL COMMENT '路線テーブルID',
  `diaName` mediumtext NOT NULL COMMENT 'ダイア名(ラベル)',
  PRIMARY KEY (`id`),
  KEY `routeId` (`routeId`),
  CONSTRAINT `Dia_ibfk_1` FOREIGN KEY (`routeId`) REFERENCES `Route` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='ダイアテーブル';

-- ----------------------------
-- Records of Dia
-- ----------------------------
INSERT INTO `Dia` VALUES ('1', '1', '平日');
INSERT INTO `Dia` VALUES ('2', '1', '休日');
INSERT INTO `Dia` VALUES ('3', '2', '平日');
INSERT INTO `Dia` VALUES ('4', '2', '休日');
INSERT INTO `Dia` VALUES ('5', '1', '150523,30');
INSERT INTO `Dia` VALUES ('6', '2', '150523,30');
INSERT INTO `Dia` VALUES ('7', '3', '平日　8/10～9/15、2/10～3/31運休');
INSERT INTO `Dia` VALUES ('8', '3', '平日');
INSERT INTO `Dia` VALUES ('13', '1', '6/21 オープンキャンパス');
INSERT INTO `Dia` VALUES ('14', '2', '6/21 オープンキャンパス');
INSERT INTO `Dia` VALUES ('15', '4', '6/21 特別運行');
INSERT INTO `Dia` VALUES ('16', '5', '6/21 特別運行');
INSERT INTO `Dia` VALUES ('17', '1', '7/18,25　補講日');
INSERT INTO `Dia` VALUES ('18', '2', '7/18,25　補講日');
INSERT INTO `Dia` VALUES ('19', '1', '7/31,8/3　試験日');
INSERT INTO `Dia` VALUES ('20', '2', '7/31,8/3　試験日');
INSERT INTO `Dia` VALUES ('21', '4', '7/26, 8/22 OCダイヤ');
INSERT INTO `Dia` VALUES ('22', '5', '7/26, 8/22 OCダイヤ');
INSERT INTO `Dia` VALUES ('23', '1', '7/26, 8/22 OCダイヤ');
INSERT INTO `Dia` VALUES ('24', '2', '7/26, 8/22 OCダイヤ');

-- ----------------------------
-- Table structure for `Route`
-- ----------------------------
DROP TABLE IF EXISTS `Route`;
CREATE TABLE `Route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `routePrefix` mediumtext NOT NULL COMMENT '路線名(要素)',
  `routeName` mediumtext NOT NULL COMMENT '路線名(ラベル)',
  `management` mediumtext COMMENT '運営会社',
  `departureLocation` mediumtext COMMENT '出発地点',
  `arrivalLocation` mediumtext COMMENT '到着地点',
  `departureLocationLat` double DEFAULT NULL COMMENT '出発地点(緯度)',
  `departureLocationLng` double DEFAULT NULL COMMENT '出発地点(経度)',
  `arrivalLocationLat` double DEFAULT NULL COMMENT '到着地点(緯度)',
  `arrivalLocationLng` double DEFAULT NULL COMMENT '到着地点(経度)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='路線テーブル';

-- ----------------------------
-- Records of Route
-- ----------------------------
INSERT INTO `Route` VALUES ('1', 'スクールバス', '四條畷行き', '大阪電気通信大学', '寝屋川キャンパス', '四條畷キャンパス', '0', '0', '0', '0');
INSERT INTO `Route` VALUES ('2', 'スクールバス', '寝屋川行き', '大阪電気通信大学', '四條畷キャンパス', '寝屋川キャンパス', '0', '0', '0', '0');
INSERT INTO `Route` VALUES ('3', '近鉄バス', '清滝線　四条畷電通大発', '近鉄バス', '四條畷電通大', '四條畷駅', null, null, null, null);
INSERT INTO `Route` VALUES ('4', 'オープンキャンパス特別バス', 'JR四條畷駅発', '大阪電気通信大学', 'JR四條畷駅', '四條畷キャンパス', '0', '0', '0', '0');
INSERT INTO `Route` VALUES ('5', 'オープンキャンパス特別バス', 'JR四條畷駅行き', '大阪電気通信大学', '四條畷キャンパス', 'JR四條畷駅', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for `Schedule`
-- ----------------------------
DROP TABLE IF EXISTS `Schedule`;
CREATE TABLE `Schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `routeId` int(11) NOT NULL COMMENT '路線テーブルID',
  `diaId` int(11) NOT NULL COMMENT 'ダイアテーブルID',
  `travelDate` date NOT NULL COMMENT '運行日',
  PRIMARY KEY (`id`),
  KEY `routeId` (`routeId`),
  KEY `diaId` (`diaId`),
  CONSTRAINT `Schedule_ibfk_1` FOREIGN KEY (`routeId`) REFERENCES `Route` (`id`),
  CONSTRAINT `Schedule_ibfk_2` FOREIGN KEY (`diaId`) REFERENCES `Dia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2464 DEFAULT CHARSET=utf8 COMMENT='運行スケジュールテーブル';

-- ----------------------------
-- Records of Schedule
-- ----------------------------
INSERT INTO `Schedule` VALUES ('745', '4', '21', '2015-07-26');
INSERT INTO `Schedule` VALUES ('746', '4', '21', '2015-08-22');
INSERT INTO `Schedule` VALUES ('747', '4', '15', '2015-06-21');
INSERT INTO `Schedule` VALUES ('748', '5', '22', '2015-07-26');
INSERT INTO `Schedule` VALUES ('749', '5', '22', '2015-08-22');
INSERT INTO `Schedule` VALUES ('750', '5', '16', '2015-06-21');
INSERT INTO `Schedule` VALUES ('1595', '3', '8', '2015-06-08');
INSERT INTO `Schedule` VALUES ('1596', '3', '8', '2015-06-09');
INSERT INTO `Schedule` VALUES ('1597', '3', '8', '2015-06-10');
INSERT INTO `Schedule` VALUES ('1598', '3', '8', '2015-06-11');
INSERT INTO `Schedule` VALUES ('1599', '3', '8', '2015-06-12');
INSERT INTO `Schedule` VALUES ('1600', '3', '8', '2015-06-15');
INSERT INTO `Schedule` VALUES ('1601', '3', '8', '2015-06-16');
INSERT INTO `Schedule` VALUES ('1602', '3', '8', '2015-06-17');
INSERT INTO `Schedule` VALUES ('1603', '3', '8', '2015-06-18');
INSERT INTO `Schedule` VALUES ('1604', '3', '8', '2015-06-19');
INSERT INTO `Schedule` VALUES ('1605', '3', '8', '2015-06-22');
INSERT INTO `Schedule` VALUES ('1606', '3', '8', '2015-06-23');
INSERT INTO `Schedule` VALUES ('1607', '3', '8', '2015-06-24');
INSERT INTO `Schedule` VALUES ('1608', '3', '8', '2015-06-25');
INSERT INTO `Schedule` VALUES ('1609', '3', '8', '2015-06-26');
INSERT INTO `Schedule` VALUES ('1610', '3', '8', '2015-06-29');
INSERT INTO `Schedule` VALUES ('1611', '3', '8', '2015-06-30');
INSERT INTO `Schedule` VALUES ('1612', '3', '8', '2015-07-01');
INSERT INTO `Schedule` VALUES ('1613', '3', '8', '2015-07-02');
INSERT INTO `Schedule` VALUES ('1614', '3', '8', '2015-07-03');
INSERT INTO `Schedule` VALUES ('1615', '3', '8', '2015-07-06');
INSERT INTO `Schedule` VALUES ('1616', '3', '8', '2015-07-07');
INSERT INTO `Schedule` VALUES ('1617', '3', '8', '2015-07-08');
INSERT INTO `Schedule` VALUES ('1618', '3', '8', '2015-07-09');
INSERT INTO `Schedule` VALUES ('1619', '3', '8', '2015-07-10');
INSERT INTO `Schedule` VALUES ('1620', '3', '8', '2015-07-13');
INSERT INTO `Schedule` VALUES ('1621', '3', '8', '2015-07-14');
INSERT INTO `Schedule` VALUES ('1622', '3', '8', '2015-07-15');
INSERT INTO `Schedule` VALUES ('1623', '3', '8', '2015-07-16');
INSERT INTO `Schedule` VALUES ('1624', '3', '8', '2015-07-17');
INSERT INTO `Schedule` VALUES ('1625', '3', '8', '2015-07-20');
INSERT INTO `Schedule` VALUES ('1626', '3', '8', '2015-07-21');
INSERT INTO `Schedule` VALUES ('1627', '3', '8', '2015-07-22');
INSERT INTO `Schedule` VALUES ('1628', '3', '8', '2015-07-23');
INSERT INTO `Schedule` VALUES ('1629', '3', '8', '2015-07-24');
INSERT INTO `Schedule` VALUES ('1630', '3', '8', '2015-07-27');
INSERT INTO `Schedule` VALUES ('1631', '3', '8', '2015-07-28');
INSERT INTO `Schedule` VALUES ('1632', '3', '8', '2015-07-29');
INSERT INTO `Schedule` VALUES ('1633', '3', '8', '2015-07-30');
INSERT INTO `Schedule` VALUES ('1634', '3', '8', '2015-07-31');
INSERT INTO `Schedule` VALUES ('1635', '3', '7', '2015-08-24');
INSERT INTO `Schedule` VALUES ('1636', '3', '7', '2015-08-25');
INSERT INTO `Schedule` VALUES ('1637', '3', '7', '2015-08-26');
INSERT INTO `Schedule` VALUES ('1638', '3', '7', '2015-08-27');
INSERT INTO `Schedule` VALUES ('1639', '3', '7', '2015-08-28');
INSERT INTO `Schedule` VALUES ('1640', '3', '7', '2015-08-31');
INSERT INTO `Schedule` VALUES ('1641', '3', '7', '2015-09-01');
INSERT INTO `Schedule` VALUES ('1642', '3', '7', '2015-09-02');
INSERT INTO `Schedule` VALUES ('1643', '3', '7', '2015-09-03');
INSERT INTO `Schedule` VALUES ('1644', '3', '7', '2015-09-04');
INSERT INTO `Schedule` VALUES ('1645', '3', '8', '2015-09-25');
INSERT INTO `Schedule` VALUES ('2252', '1', '1', '2015-05-20');
INSERT INTO `Schedule` VALUES ('2253', '1', '1', '2015-05-21');
INSERT INTO `Schedule` VALUES ('2254', '1', '1', '2015-05-22');
INSERT INTO `Schedule` VALUES ('2255', '1', '1', '2015-05-25');
INSERT INTO `Schedule` VALUES ('2256', '1', '1', '2015-05-26');
INSERT INTO `Schedule` VALUES ('2257', '1', '1', '2015-05-27');
INSERT INTO `Schedule` VALUES ('2258', '1', '1', '2015-05-28');
INSERT INTO `Schedule` VALUES ('2259', '1', '1', '2015-05-29');
INSERT INTO `Schedule` VALUES ('2260', '1', '1', '2015-06-01');
INSERT INTO `Schedule` VALUES ('2261', '1', '1', '2015-06-02');
INSERT INTO `Schedule` VALUES ('2262', '1', '1', '2015-06-03');
INSERT INTO `Schedule` VALUES ('2263', '1', '1', '2015-06-04');
INSERT INTO `Schedule` VALUES ('2264', '1', '1', '2015-06-05');
INSERT INTO `Schedule` VALUES ('2265', '1', '1', '2015-06-08');
INSERT INTO `Schedule` VALUES ('2266', '1', '1', '2015-06-09');
INSERT INTO `Schedule` VALUES ('2267', '1', '1', '2015-06-10');
INSERT INTO `Schedule` VALUES ('2268', '1', '1', '2015-06-11');
INSERT INTO `Schedule` VALUES ('2269', '1', '1', '2015-06-12');
INSERT INTO `Schedule` VALUES ('2270', '1', '1', '2015-06-16');
INSERT INTO `Schedule` VALUES ('2271', '1', '1', '2015-06-17');
INSERT INTO `Schedule` VALUES ('2272', '1', '1', '2015-06-15');
INSERT INTO `Schedule` VALUES ('2273', '1', '1', '2015-06-18');
INSERT INTO `Schedule` VALUES ('2274', '1', '1', '2015-06-19');
INSERT INTO `Schedule` VALUES ('2275', '1', '1', '2015-06-22');
INSERT INTO `Schedule` VALUES ('2276', '1', '1', '2015-06-23');
INSERT INTO `Schedule` VALUES ('2277', '1', '1', '2015-06-24');
INSERT INTO `Schedule` VALUES ('2278', '1', '1', '2015-06-25');
INSERT INTO `Schedule` VALUES ('2279', '1', '1', '2015-06-26');
INSERT INTO `Schedule` VALUES ('2280', '1', '1', '2015-06-29');
INSERT INTO `Schedule` VALUES ('2281', '1', '1', '2015-06-30');
INSERT INTO `Schedule` VALUES ('2282', '1', '1', '2015-07-01');
INSERT INTO `Schedule` VALUES ('2283', '1', '1', '2015-07-02');
INSERT INTO `Schedule` VALUES ('2284', '1', '1', '2015-07-03');
INSERT INTO `Schedule` VALUES ('2285', '1', '1', '2015-07-06');
INSERT INTO `Schedule` VALUES ('2286', '1', '1', '2015-07-07');
INSERT INTO `Schedule` VALUES ('2287', '1', '1', '2015-07-08');
INSERT INTO `Schedule` VALUES ('2288', '1', '1', '2015-07-09');
INSERT INTO `Schedule` VALUES ('2289', '1', '1', '2015-07-10');
INSERT INTO `Schedule` VALUES ('2290', '1', '1', '2015-07-13');
INSERT INTO `Schedule` VALUES ('2291', '1', '1', '2015-07-14');
INSERT INTO `Schedule` VALUES ('2292', '1', '1', '2015-07-15');
INSERT INTO `Schedule` VALUES ('2293', '1', '1', '2015-07-16');
INSERT INTO `Schedule` VALUES ('2294', '1', '1', '2015-07-17');
INSERT INTO `Schedule` VALUES ('2295', '1', '1', '2015-07-20');
INSERT INTO `Schedule` VALUES ('2296', '1', '1', '2015-07-21');
INSERT INTO `Schedule` VALUES ('2297', '1', '1', '2015-07-22');
INSERT INTO `Schedule` VALUES ('2298', '1', '1', '2015-07-23');
INSERT INTO `Schedule` VALUES ('2299', '1', '1', '2015-07-24');
INSERT INTO `Schedule` VALUES ('2300', '1', '1', '2015-07-27');
INSERT INTO `Schedule` VALUES ('2301', '1', '1', '2015-07-28');
INSERT INTO `Schedule` VALUES ('2302', '1', '1', '2015-07-29');
INSERT INTO `Schedule` VALUES ('2303', '1', '1', '2015-09-18');
INSERT INTO `Schedule` VALUES ('2304', '1', '1', '2015-09-21');
INSERT INTO `Schedule` VALUES ('2305', '1', '1', '2015-09-24');
INSERT INTO `Schedule` VALUES ('2306', '1', '1', '2015-09-25');
INSERT INTO `Schedule` VALUES ('2307', '1', '1', '2015-09-28');
INSERT INTO `Schedule` VALUES ('2308', '1', '1', '2015-09-29');
INSERT INTO `Schedule` VALUES ('2309', '1', '1', '2015-09-30');
INSERT INTO `Schedule` VALUES ('2310', '1', '1', '2015-10-01');
INSERT INTO `Schedule` VALUES ('2311', '1', '1', '2015-10-02');
INSERT INTO `Schedule` VALUES ('2312', '1', '1', '2015-10-05');
INSERT INTO `Schedule` VALUES ('2313', '1', '1', '2015-10-06');
INSERT INTO `Schedule` VALUES ('2314', '1', '1', '2015-10-07');
INSERT INTO `Schedule` VALUES ('2315', '1', '1', '2015-10-08');
INSERT INTO `Schedule` VALUES ('2316', '1', '1', '2015-10-09');
INSERT INTO `Schedule` VALUES ('2317', '1', '2', '2015-06-06');
INSERT INTO `Schedule` VALUES ('2318', '1', '2', '2015-06-13');
INSERT INTO `Schedule` VALUES ('2319', '1', '2', '2015-06-20');
INSERT INTO `Schedule` VALUES ('2320', '1', '2', '2015-06-27');
INSERT INTO `Schedule` VALUES ('2321', '1', '2', '2015-07-04');
INSERT INTO `Schedule` VALUES ('2322', '1', '2', '2015-07-11');
INSERT INTO `Schedule` VALUES ('2323', '1', '2', '2015-08-04');
INSERT INTO `Schedule` VALUES ('2324', '1', '2', '2015-08-01');
INSERT INTO `Schedule` VALUES ('2325', '1', '2', '2015-08-24');
INSERT INTO `Schedule` VALUES ('2326', '1', '2', '2015-08-25');
INSERT INTO `Schedule` VALUES ('2327', '1', '2', '2015-08-26');
INSERT INTO `Schedule` VALUES ('2328', '1', '2', '2015-08-27');
INSERT INTO `Schedule` VALUES ('2329', '1', '2', '2015-08-28');
INSERT INTO `Schedule` VALUES ('2330', '1', '2', '2015-08-29');
INSERT INTO `Schedule` VALUES ('2331', '1', '2', '2015-08-31');
INSERT INTO `Schedule` VALUES ('2332', '1', '2', '2015-09-01');
INSERT INTO `Schedule` VALUES ('2333', '1', '2', '2015-09-02');
INSERT INTO `Schedule` VALUES ('2334', '1', '2', '2015-09-03');
INSERT INTO `Schedule` VALUES ('2335', '1', '2', '2015-09-04');
INSERT INTO `Schedule` VALUES ('2336', '1', '2', '2015-09-05');
INSERT INTO `Schedule` VALUES ('2337', '1', '2', '2015-09-07');
INSERT INTO `Schedule` VALUES ('2338', '1', '2', '2015-09-08');
INSERT INTO `Schedule` VALUES ('2339', '1', '2', '2015-09-09');
INSERT INTO `Schedule` VALUES ('2340', '1', '2', '2015-09-10');
INSERT INTO `Schedule` VALUES ('2341', '1', '2', '2015-09-11');
INSERT INTO `Schedule` VALUES ('2342', '1', '2', '2015-09-12');
INSERT INTO `Schedule` VALUES ('2343', '1', '2', '2015-09-14');
INSERT INTO `Schedule` VALUES ('2344', '1', '2', '2015-09-15');
INSERT INTO `Schedule` VALUES ('2345', '1', '2', '2015-09-19');
INSERT INTO `Schedule` VALUES ('2346', '1', '2', '2015-09-26');
INSERT INTO `Schedule` VALUES ('2347', '1', '2', '2015-10-10');
INSERT INTO `Schedule` VALUES ('2348', '1', '5', '2015-05-30');
INSERT INTO `Schedule` VALUES ('2349', '1', '5', '2015-05-23');
INSERT INTO `Schedule` VALUES ('2350', '1', '13', '2015-06-21');
INSERT INTO `Schedule` VALUES ('2351', '1', '17', '2015-07-18');
INSERT INTO `Schedule` VALUES ('2352', '1', '17', '2015-07-25');
INSERT INTO `Schedule` VALUES ('2353', '1', '19', '2015-07-31');
INSERT INTO `Schedule` VALUES ('2354', '1', '19', '2015-08-03');
INSERT INTO `Schedule` VALUES ('2355', '1', '23', '2015-07-26');
INSERT INTO `Schedule` VALUES ('2356', '1', '23', '2015-08-22');
INSERT INTO `Schedule` VALUES ('2357', '1', '1', '2015-10-12');
INSERT INTO `Schedule` VALUES ('2358', '2', '3', '2015-05-21');
INSERT INTO `Schedule` VALUES ('2359', '2', '3', '2015-05-20');
INSERT INTO `Schedule` VALUES ('2360', '2', '3', '2015-05-22');
INSERT INTO `Schedule` VALUES ('2361', '2', '3', '2015-05-26');
INSERT INTO `Schedule` VALUES ('2362', '2', '3', '2015-05-25');
INSERT INTO `Schedule` VALUES ('2363', '2', '3', '2015-05-27');
INSERT INTO `Schedule` VALUES ('2364', '2', '3', '2015-05-28');
INSERT INTO `Schedule` VALUES ('2365', '2', '3', '2015-05-29');
INSERT INTO `Schedule` VALUES ('2366', '2', '3', '2015-06-01');
INSERT INTO `Schedule` VALUES ('2367', '2', '3', '2015-06-02');
INSERT INTO `Schedule` VALUES ('2368', '2', '3', '2015-06-03');
INSERT INTO `Schedule` VALUES ('2369', '2', '3', '2015-06-04');
INSERT INTO `Schedule` VALUES ('2370', '2', '3', '2015-06-05');
INSERT INTO `Schedule` VALUES ('2371', '2', '3', '2015-06-08');
INSERT INTO `Schedule` VALUES ('2372', '2', '3', '2015-06-09');
INSERT INTO `Schedule` VALUES ('2373', '2', '3', '2015-06-10');
INSERT INTO `Schedule` VALUES ('2374', '2', '3', '2015-06-11');
INSERT INTO `Schedule` VALUES ('2375', '2', '3', '2015-06-12');
INSERT INTO `Schedule` VALUES ('2376', '2', '3', '2015-06-15');
INSERT INTO `Schedule` VALUES ('2377', '2', '3', '2015-06-16');
INSERT INTO `Schedule` VALUES ('2378', '2', '3', '2015-06-17');
INSERT INTO `Schedule` VALUES ('2379', '2', '3', '2015-06-18');
INSERT INTO `Schedule` VALUES ('2380', '2', '3', '2015-06-19');
INSERT INTO `Schedule` VALUES ('2381', '2', '3', '2015-06-22');
INSERT INTO `Schedule` VALUES ('2382', '2', '3', '2015-06-23');
INSERT INTO `Schedule` VALUES ('2383', '2', '3', '2015-06-24');
INSERT INTO `Schedule` VALUES ('2384', '2', '3', '2015-06-25');
INSERT INTO `Schedule` VALUES ('2385', '2', '3', '2015-06-26');
INSERT INTO `Schedule` VALUES ('2386', '2', '3', '2015-06-29');
INSERT INTO `Schedule` VALUES ('2387', '2', '3', '2015-06-30');
INSERT INTO `Schedule` VALUES ('2388', '2', '3', '2015-07-01');
INSERT INTO `Schedule` VALUES ('2389', '2', '3', '2015-07-02');
INSERT INTO `Schedule` VALUES ('2390', '2', '3', '2015-07-03');
INSERT INTO `Schedule` VALUES ('2391', '2', '3', '2015-07-06');
INSERT INTO `Schedule` VALUES ('2392', '2', '3', '2015-07-07');
INSERT INTO `Schedule` VALUES ('2393', '2', '3', '2015-07-08');
INSERT INTO `Schedule` VALUES ('2394', '2', '3', '2015-07-09');
INSERT INTO `Schedule` VALUES ('2395', '2', '3', '2015-07-10');
INSERT INTO `Schedule` VALUES ('2396', '2', '3', '2015-07-13');
INSERT INTO `Schedule` VALUES ('2397', '2', '3', '2015-07-14');
INSERT INTO `Schedule` VALUES ('2398', '2', '3', '2015-07-15');
INSERT INTO `Schedule` VALUES ('2399', '2', '3', '2015-07-16');
INSERT INTO `Schedule` VALUES ('2400', '2', '3', '2015-07-17');
INSERT INTO `Schedule` VALUES ('2401', '2', '3', '2015-07-20');
INSERT INTO `Schedule` VALUES ('2402', '2', '3', '2015-07-21');
INSERT INTO `Schedule` VALUES ('2403', '2', '3', '2015-07-22');
INSERT INTO `Schedule` VALUES ('2404', '2', '3', '2015-07-23');
INSERT INTO `Schedule` VALUES ('2405', '2', '3', '2015-07-24');
INSERT INTO `Schedule` VALUES ('2406', '2', '3', '2015-07-27');
INSERT INTO `Schedule` VALUES ('2407', '2', '3', '2015-07-28');
INSERT INTO `Schedule` VALUES ('2408', '2', '3', '2015-07-29');
INSERT INTO `Schedule` VALUES ('2409', '2', '3', '2015-09-18');
INSERT INTO `Schedule` VALUES ('2410', '2', '3', '2015-09-21');
INSERT INTO `Schedule` VALUES ('2411', '2', '3', '2015-09-25');
INSERT INTO `Schedule` VALUES ('2412', '2', '3', '2015-09-28');
INSERT INTO `Schedule` VALUES ('2413', '2', '3', '2015-09-29');
INSERT INTO `Schedule` VALUES ('2414', '2', '3', '2015-09-30');
INSERT INTO `Schedule` VALUES ('2415', '2', '3', '2015-10-01');
INSERT INTO `Schedule` VALUES ('2416', '2', '3', '2015-10-02');
INSERT INTO `Schedule` VALUES ('2417', '2', '3', '2015-10-05');
INSERT INTO `Schedule` VALUES ('2418', '2', '3', '2015-10-06');
INSERT INTO `Schedule` VALUES ('2419', '2', '3', '2015-10-07');
INSERT INTO `Schedule` VALUES ('2420', '2', '3', '2015-10-08');
INSERT INTO `Schedule` VALUES ('2421', '2', '3', '2015-10-09');
INSERT INTO `Schedule` VALUES ('2422', '2', '4', '2015-06-06');
INSERT INTO `Schedule` VALUES ('2423', '2', '4', '2015-06-13');
INSERT INTO `Schedule` VALUES ('2424', '2', '4', '2015-06-20');
INSERT INTO `Schedule` VALUES ('2425', '2', '4', '2015-06-27');
INSERT INTO `Schedule` VALUES ('2426', '2', '4', '2015-07-04');
INSERT INTO `Schedule` VALUES ('2427', '2', '4', '2015-07-11');
INSERT INTO `Schedule` VALUES ('2428', '2', '4', '2015-08-01');
INSERT INTO `Schedule` VALUES ('2429', '2', '4', '2015-08-04');
INSERT INTO `Schedule` VALUES ('2430', '2', '4', '2015-08-24');
INSERT INTO `Schedule` VALUES ('2431', '2', '4', '2015-08-25');
INSERT INTO `Schedule` VALUES ('2432', '2', '4', '2015-08-26');
INSERT INTO `Schedule` VALUES ('2433', '2', '4', '2015-08-27');
INSERT INTO `Schedule` VALUES ('2434', '2', '4', '2015-08-28');
INSERT INTO `Schedule` VALUES ('2435', '2', '4', '2015-08-31');
INSERT INTO `Schedule` VALUES ('2436', '2', '4', '2015-08-29');
INSERT INTO `Schedule` VALUES ('2437', '2', '4', '2015-09-01');
INSERT INTO `Schedule` VALUES ('2438', '2', '4', '2015-09-07');
INSERT INTO `Schedule` VALUES ('2439', '2', '4', '2015-09-08');
INSERT INTO `Schedule` VALUES ('2440', '2', '4', '2015-09-14');
INSERT INTO `Schedule` VALUES ('2441', '2', '4', '2015-09-15');
INSERT INTO `Schedule` VALUES ('2442', '2', '4', '2015-09-02');
INSERT INTO `Schedule` VALUES ('2443', '2', '4', '2015-09-09');
INSERT INTO `Schedule` VALUES ('2444', '2', '4', '2015-09-03');
INSERT INTO `Schedule` VALUES ('2445', '2', '4', '2015-09-04');
INSERT INTO `Schedule` VALUES ('2446', '2', '4', '2015-09-05');
INSERT INTO `Schedule` VALUES ('2447', '2', '4', '2015-09-10');
INSERT INTO `Schedule` VALUES ('2448', '2', '4', '2015-09-11');
INSERT INTO `Schedule` VALUES ('2449', '2', '4', '2015-09-12');
INSERT INTO `Schedule` VALUES ('2450', '2', '4', '2015-09-19');
INSERT INTO `Schedule` VALUES ('2451', '2', '4', '2015-09-24');
INSERT INTO `Schedule` VALUES ('2452', '2', '4', '2015-09-26');
INSERT INTO `Schedule` VALUES ('2453', '2', '4', '2015-10-10');
INSERT INTO `Schedule` VALUES ('2454', '2', '6', '2015-05-30');
INSERT INTO `Schedule` VALUES ('2455', '2', '6', '2015-05-23');
INSERT INTO `Schedule` VALUES ('2456', '2', '14', '2015-06-21');
INSERT INTO `Schedule` VALUES ('2457', '2', '18', '2015-07-18');
INSERT INTO `Schedule` VALUES ('2458', '2', '18', '2015-07-25');
INSERT INTO `Schedule` VALUES ('2459', '2', '20', '2015-07-31');
INSERT INTO `Schedule` VALUES ('2460', '2', '20', '2015-08-03');
INSERT INTO `Schedule` VALUES ('2461', '2', '24', '2015-07-26');
INSERT INTO `Schedule` VALUES ('2462', '2', '24', '2015-08-22');
INSERT INTO `Schedule` VALUES ('2463', '2', '3', '2015-10-12');
