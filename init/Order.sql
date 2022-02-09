CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `password` varchar(200),
  `name` varchar(45),
  `profileImageURL` varchar(300),
  `nickname` varchar(45),
  `email` varchar(45),
  `phoneNumber` varchar(11),
  `status` char(1),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `userAddress` (
  `id` varchar(255),
  `address` varchar(100),
  `streetAddress` varchar(100),
  `latitude` decimal,
  `longitude` decimal,
  `userID` int
);

CREATE TABLE `like` (
  `userID` int,
  `storeID` int,
  `createdAt` datetime,
  `isLiked` char(1)
);

CREATE TABLE `couponUser` (
  `userID` int,
  `couponID` uuid,
  `status` char(1)
);

CREATE TABLE `coupon` (
  `id` uuid PRIMARY KEY,
  `information` varchar(100),
  `createdAt` datetime,
  `validationTime` varchar(15),
  `isDeleted` char(1),
  `storeID` int
);

CREATE TABLE `point` (
  `save` int(4),
  `storeName` varchar(255),
  `availablePoint` int(6),
  `expirationDate` varchar(8),
  `userID` int,
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `review` (
  `id` uuid PRIMARY KEY,
  `grade` int(1),
  `content` varchar(1000),
  `createdAt` datetime,
  `updatedAt` datetime,
  `visible` char(1),
  `userID` int,
  `storeID` int
);

CREATE TABLE `reviewImage` (
  `id` uuid PRIMARY KEY,
  `URL` varchar(300),
  `reviewID` uuid
);

CREATE TABLE `ownerComment` (
  `content` varchar(1000),
  `createdAt` datetime,
  `updatedAt` datetime,
  `visible` char(1),
  `userID` int,
  `reviewID` uuid
);

CREATE TABLE `store` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `information` varchar(500),
  `openTime` varchar(4),
  `closeTime` varchar(4),
  `openDay` varchar(8),
  `closeDay` varchar(8),
  `phoneNumber` varchar(11),
  `deliveryAvailavle` tinyInt,
  `minDeliveryTime` int(2),
  `maxDeliveryTime` int(2),
  `mainImageURL` varchar(300),
  `createdAt` datetime,
  `updatedAt` datetime,
  `isDeleted` char(1),
  `minDeliveryTip` int(5),
  `status` char(1),
  `categoryID` int,
  `ownerID` int
);

CREATE TABLE `storeImage` (
  `id` uuid PRIMARY KEY,
  `URL` varcha(300),
  `storeID` int
);

CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20),
  `iconURL` varchar(300),
  `createdAt` datetime,
  `status` char(1),
  `type` char(1)
);

CREATE TABLE `menu` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(30),
  `menuImage` varchar(300),
  `simpleInformation` varchar(25),
  `information` varchar(100),
  `price` int(6),
  `categoryID` int
);

CREATE TABLE `basket` (
  `id` uuid PRIMARY KEY,
  `quantity` int(3),
  `createdAt` datetime,
  `updatedAt` datetime,
  `userID` int,
  `storeID` int,
  `menuID` bigint
);

CREATE TABLE `order` (
  `id` uuid PRIMARY KEY,
  `storeRequestContext` varchar(50),
  `ridderRequestContext` varchar(50),
  `createdAt` datetime,
  `updatedAt` datetime,
  `status` char(1),
  `basketID` uuid
);

ALTER TABLE `userAddress` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

ALTER TABLE `like` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

ALTER TABLE `like` ADD FOREIGN KEY (`storeID`) REFERENCES `store` (`id`);

ALTER TABLE `couponUser` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

ALTER TABLE `couponUser` ADD FOREIGN KEY (`couponID`) REFERENCES `coupon` (`id`);

ALTER TABLE `coupon` ADD FOREIGN KEY (`storeID`) REFERENCES `store` (`id`);

ALTER TABLE `point` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

ALTER TABLE `review` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

ALTER TABLE `review` ADD FOREIGN KEY (`storeID`) REFERENCES `store` (`id`);

ALTER TABLE `reviewImage` ADD FOREIGN KEY (`reviewID`) REFERENCES `review` (`id`);

ALTER TABLE `ownerComment` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

ALTER TABLE `ownerComment` ADD FOREIGN KEY (`reviewID`) REFERENCES `review` (`id`);

ALTER TABLE `store` ADD FOREIGN KEY (`categoryID`) REFERENCES `category` (`id`);

ALTER TABLE `store` ADD FOREIGN KEY (`ownerID`) REFERENCES `user` (`id`);

ALTER TABLE `storeImage` ADD FOREIGN KEY (`storeID`) REFERENCES `store` (`id`);

ALTER TABLE `menu` ADD FOREIGN KEY (`categoryID`) REFERENCES `category` (`id`);

ALTER TABLE `basket` ADD FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

ALTER TABLE `basket` ADD FOREIGN KEY (`storeID`) REFERENCES `store` (`id`);

ALTER TABLE `basket` ADD FOREIGN KEY (`menuID`) REFERENCES `menu` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`basketID`) REFERENCES `basket` (`id`);
