/*
Navicat MySQL Data Transfer

Source Server         : そるとさん
Source Server Version : 50543
Source Host           : oecu.pw:3306
Source Database       : alpha_back

Target Server Type    : MYSQL
Target Server Version : 50543
File Encoding         : 65001

Date: 2015-05-01 07:23:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `DiaGroupT`
-- ----------------------------
DROP TABLE IF EXISTS `DiaGroupT`;
CREATE TABLE `DiaGroupT` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `RouteListT_ID_` int(11) NOT NULL COMMENT '路線リストテーブルID',
  `DiaName` mediumtext NOT NULL COMMENT 'ダイア名(ラベル)',
  PRIMARY KEY (`id`),
  KEY `RouteListT_ID_` (`RouteListT_ID_`),
  CONSTRAINT `DiaGroupT_ibfk_1` FOREIGN KEY (`RouteListT_ID_`) REFERENCES `RouteListT` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COMMENT='ダイアグループテーブル';

-- ----------------------------
-- Records of DiaGroupT
-- ----------------------------
INSERT INTO `DiaGroupT` VALUES ('1', '1', '平日');
INSERT INTO `DiaGroupT` VALUES ('2', '1', '休日');
INSERT INTO `DiaGroupT` VALUES ('3', '2', '平日');
INSERT INTO `DiaGroupT` VALUES ('4', '2', '休日');

-- ----------------------------
-- Table structure for `DiaT`
-- ----------------------------
DROP TABLE IF EXISTS `DiaT`;
CREATE TABLE `DiaT` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `DiaGroupT_ID_` int(11) NOT NULL COMMENT 'ダイアグループテーブルID',
  `DepartureTime` time NOT NULL COMMENT '出発時刻',
  `ArrivalTime` time NOT NULL COMMENT '到着時刻',
  `Note` mediumtext COMMENT '備考',
  PRIMARY KEY (`id`),
  KEY `DiaGroupT_ID_` (`DiaGroupT_ID_`),
  CONSTRAINT `DiaT_ibfk_1` FOREIGN KEY (`DiaGroupT_ID_`) REFERENCES `DiaGroupT` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=661 DEFAULT CHARSET=utf8 COMMENT='ダイアテーブル';

-- ----------------------------
-- Records of DiaT
-- ----------------------------
INSERT INTO `DiaT` VALUES ('1', '1', '08:30:00', '08:50:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('2', '1', '08:40:00', '09:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('3', '1', '09:00:00', '09:20:00', '');
INSERT INTO `DiaT` VALUES ('4', '1', '09:05:00', '09:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('5', '1', '09:40:00', '10:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('6', '1', '10:20:00', '10:40:00', '');
INSERT INTO `DiaT` VALUES ('7', '1', '10:40:00', '11:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('8', '1', '11:20:00', '11:40:00', '');
INSERT INTO `DiaT` VALUES ('9', '1', '11:40:00', '12:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('10', '1', '12:20:00', '12:40:00', '');
INSERT INTO `DiaT` VALUES ('11', '1', '12:40:00', '13:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('12', '1', '13:00:00', '13:20:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('13', '1', '13:20:00', '13:40:00', '');
INSERT INTO `DiaT` VALUES ('14', '1', '13:40:00', '14:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('15', '1', '14:20:00', '14:40:00', '');
INSERT INTO `DiaT` VALUES ('16', '1', '14:40:00', '15:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('17', '1', '15:20:00', '15:40:00', '');
INSERT INTO `DiaT` VALUES ('18', '1', '15:40:00', '16:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('19', '1', '16:20:00', '16:40:00', '');
INSERT INTO `DiaT` VALUES ('20', '1', '16:40:00', '17:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('21', '1', '17:20:00', '17:40:00', '');
INSERT INTO `DiaT` VALUES ('22', '1', '17:40:00', '18:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('23', '1', '18:20:00', '18:40:00', '');
INSERT INTO `DiaT` VALUES ('24', '1', '18:40:00', '19:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('25', '1', '19:05:00', '19:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('26', '1', '19:40:00', '20:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('27', '1', '20:05:00', '20:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('28', '1', '20:40:00', '21:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('29', '2', '08:30:00', '08:50:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('30', '2', '09:05:00', '09:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('31', '2', '09:40:00', '10:00:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('32', '2', '10:35:00', '10:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('33', '2', '11:35:00', '11:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('34', '2', '12:35:00', '12:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('35', '2', '13:35:00', '13:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('36', '2', '14:35:00', '14:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('37', '2', '15:35:00', '15:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('38', '2', '16:35:00', '16:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('39', '2', '17:35:00', '17:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('40', '2', '18:35:00', '18:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('41', '2', '19:35:00', '19:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('42', '2', '20:35:00', '20:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('43', '3', '09:10:00', '09:30:00', '');
INSERT INTO `DiaT` VALUES ('44', '3', '09:50:00', '10:10:00', '');
INSERT INTO `DiaT` VALUES ('45', '3', '10:10:00', '10:30:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('46', '3', '10:50:00', '11:10:00', '');
INSERT INTO `DiaT` VALUES ('47', '3', '11:10:00', '11:30:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('48', '3', '11:30:00', '11:50:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('49', '3', '11:50:00', '12:10:00', '');
INSERT INTO `DiaT` VALUES ('50', '3', '12:10:00', '12:30:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('51', '3', '12:50:00', '13:10:00', '');
INSERT INTO `DiaT` VALUES ('52', '3', '13:10:00', '13:30:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('53', '3', '13:50:00', '14:10:00', '');
INSERT INTO `DiaT` VALUES ('54', '3', '14:10:00', '14:30:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('55', '3', '14:50:00', '15:10:00', '');
INSERT INTO `DiaT` VALUES ('56', '3', '15:10:00', '15:30:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('57', '3', '15:20:00', '15:40:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('58', '3', '15:50:00', '16:10:00', '');
INSERT INTO `DiaT` VALUES ('59', '3', '16:05:00', '16:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('60', '3', '16:42:00', '17:02:00', '');
INSERT INTO `DiaT` VALUES ('61', '3', '16:50:00', '17:10:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('62', '3', '16:55:00', '17:15:00', '');
INSERT INTO `DiaT` VALUES ('63', '3', '17:00:00', '17:20:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('64', '3', '17:05:00', '17:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('65', '3', '17:50:00', '18:10:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('66', '3', '18:05:00', '18:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('67', '3', '18:35:00', '18:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('68', '3', '18:50:00', '19:10:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('69', '3', '19:05:00', '19:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('70', '3', '19:35:00', '19:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('71', '3', '19:50:00', '20:10:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('72', '3', '20:05:00', '20:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('73', '3', '20:35:00', '20:55:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('74', '3', '21:05:00', '21:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('75', '4', '10:05:00', '10:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('76', '4', '11:05:00', '11:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('77', '4', '12:05:00', '12:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('78', '4', '13:05:00', '13:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('79', '4', '14:05:00', '14:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('80', '4', '15:05:00', '15:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('81', '4', '16:05:00', '16:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('82', '4', '17:10:00', '17:30:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('83', '4', '18:05:00', '18:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('84', '4', '19:05:00', '19:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('85', '4', '20:05:00', '20:25:00', '忍ケ丘経由');
INSERT INTO `DiaT` VALUES ('86', '4', '21:05:00', '21:25:00', '忍ケ丘経由');

-- ----------------------------
-- Table structure for `RouteListT`
-- ----------------------------
DROP TABLE IF EXISTS `RouteListT`;
CREATE TABLE `RouteListT` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `RouteName` mediumtext NOT NULL COMMENT '路線名(ラベル)',
  `Management` mediumtext COMMENT '運営会社',
  `DepartureLocation` mediumtext NOT NULL COMMENT '出発地点',
  `ArrivalLocation` mediumtext NOT NULL COMMENT '到着地点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='路線リストテーブル';

-- ----------------------------
-- Records of RouteListT
-- ----------------------------
INSERT INTO `RouteListT` VALUES ('1', 'スクールバス　四條畷行き', '大阪電気通信大学', '寝屋川キャンパス', '四條畷キャンパス');
INSERT INTO `RouteListT` VALUES ('2', 'スクールバス　寝屋川行き', '大阪電気通信大学', '四條畷キャンパス', '寝屋川キャンパス');

-- ----------------------------
-- Table structure for `ScheduleT`
-- ----------------------------
DROP TABLE IF EXISTS `ScheduleT`;
CREATE TABLE `ScheduleT` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `RouteListT_ID_` int(11) NOT NULL COMMENT '路線リストテーブルID',
  `DiaGroupT_ID_` int(11) NOT NULL COMMENT 'ダイアグループテーブルID',
  `TravelDate` date NOT NULL COMMENT '運行日',
  PRIMARY KEY (`id`),
  KEY `RouteListT_ID_` (`RouteListT_ID_`),
  KEY `DiaGroupT_ID_` (`DiaGroupT_ID_`),
  CONSTRAINT `ScheduleT_ibfk_1` FOREIGN KEY (`RouteListT_ID_`) REFERENCES `RouteListT` (`id`),
  CONSTRAINT `ScheduleT_ibfk_2` FOREIGN KEY (`DiaGroupT_ID_`) REFERENCES `DiaGroupT` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='運行スケジュールテーブル';

-- ----------------------------
-- Records of ScheduleT
-- ----------------------------
