-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2021-09-28 11:19:48
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `feiyucms`
--

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_ad`
--

CREATE TABLE `feiyu_ad` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL,
  `time` bigint(66) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_ad`
--

INSERT INTO `feiyu_ad` (`id`, `value`, `time`) VALUES
(1, '{\"web\":\"1\",\"ad\":\"1\",\"sign\":\"4a3a3bf41c820c2c44ab0f12c318ba4781019deef4ce877d8a3f114aee8eeeff\"}', 1623315770211);

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_admin`
--

CREATE TABLE `feiyu_admin` (
  `id` int(11) NOT NULL,
  `name` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_admin`
--

INSERT INTO `feiyu_admin` (`id`, `name`, `password`) VALUES
(1, 'admin', '3248b5ad3cbc2aa328e81731247ec87c');

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_construct`
--

CREATE TABLE `feiyu_construct` (
  `id` int(11) NOT NULL,
  `modelid` int(11) NOT NULL,
  `style` int(11) NOT NULL,
  `label` varchar(222) NOT NULL,
  `value` varchar(222) NOT NULL,
  `constructid` int(11) NOT NULL,
  `sort` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_construct`
--

INSERT INTO `feiyu_construct` (`id`, `modelid`, `style`, `label`, `value`, `constructid`, `sort`) VALUES
(1, 1, 1, '姓名', 'tname', 0, 1),
(3, 1, 2, '电话', 'tmobile', 0, 2),
(10, 1, 2, '需求', 'tneed', 0, 3),
(9, 2, 1, '文章标题', 'title', 0, 1),
(13, 4, 1, '您的姓名', 'lname', 0, 1),
(14, 4, 1, '您的电话', 'lmobile', 0, 2),
(15, 2, 3, '文章内容', 'contents', 0, 6),
(20, 4, 6, '性别', 'sex', 2, 3);

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_content`
--

CREATE TABLE `feiyu_content` (
  `id` int(11) NOT NULL,
  `info` text NOT NULL,
  `modelid` int(4) NOT NULL,
  `sort` int(4) NOT NULL,
  `status` int(2) NOT NULL,
  `time` bigint(66) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_contentmodel`
--

CREATE TABLE `feiyu_contentmodel` (
  `id` int(11) NOT NULL,
  `name` varchar(222) NOT NULL,
  `route` varchar(44) NOT NULL,
  `template` varchar(66) NOT NULL,
  `isnav` int(2) NOT NULL,
  `modelid` int(11) NOT NULL,
  `sort` int(3) NOT NULL,
  `agent` int(3) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_contentmodel`
--

INSERT INTO `feiyu_contentmodel` (`id`, `name`, `route`, `template`, `isnav`, `modelid`, `sort`, `agent`) VALUES
(1, '关于我们', 'about', 'about', 1, 2, 0, 0),
(2, '公司简介', 'company', 'company', 1, 2, 0, 1),
(3, '设计案例', 'disgn', 'disgn', 1, 3, 0, 0),
(4, 'app案例', 'app', 'app', 1, 3, 0, 3),
(5, '小程序案例', 'order', 'order', 1, 3, 0, 3),
(6, '联系我们', 'concat', 'concat', 1, 2, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_dictionary`
--

CREATE TABLE `feiyu_dictionary` (
  `id` int(11) NOT NULL,
  `name` varchar(222) NOT NULL,
  `beizhu` varchar(222) NOT NULL,
  `sort` int(3) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_dictionary`
--

INSERT INTO `feiyu_dictionary` (`id`, `name`, `beizhu`, `sort`) VALUES
(1, '显示状态', '文章是否显示', 0),
(2, '性别', '填写男，女或未知', 0);

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_dictionarydata`
--

CREATE TABLE `feiyu_dictionarydata` (
  `id` int(11) NOT NULL,
  `did` int(11) NOT NULL,
  `label` varchar(222) NOT NULL,
  `value` varchar(222) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_dictionarydata`
--

INSERT INTO `feiyu_dictionarydata` (`id`, `did`, `label`, `value`) VALUES
(1, 2, '男', '1'),
(2, 2, '女', '2'),
(4, 2, '未知', '3'),
(5, 1, '显示', '1'),
(6, 1, '隐藏', '2');

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_model`
--

CREATE TABLE `feiyu_model` (
  `id` int(11) NOT NULL,
  `name` varchar(234) NOT NULL,
  `beizhu` varchar(234) NOT NULL,
  `sort` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_model`
--

INSERT INTO `feiyu_model` (`id`, `name`, `beizhu`, `sort`) VALUES
(1, '弹窗模型', '自定义弹窗', 0),
(2, '文章模型', '文章内容模型', 0),
(3, '图片模型', '图片模型', 0),
(4, '联系我们', '联系我们', 0),
(5, '经典案例', '经典案例', 0);

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_seo`
--

CREATE TABLE `feiyu_seo` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL,
  `time` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_seo`
--

INSERT INTO `feiyu_seo` (`id`, `value`, `time`) VALUES
(1, '{\"seotitle\":\"襄阳飞鱼网科技有限公司\",\"seokeywords\":\"襄阳大型网络科技项目建设\",\"seocontents\":\"襄阳飞鱼网络科技有限公司s\",\"sign\":\"4a3a3bf41c820c2c44ab0f12c318ba4781019deef4ce877d8a3f114aee8eeeff\"}', 1623315766432);

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_seocontent`
--

CREATE TABLE `feiyu_seocontent` (
  `id` int(11) NOT NULL,
  `contentid` int(3) NOT NULL,
  `seotitle` varchar(222) NOT NULL,
  `seokey` varchar(334) NOT NULL,
  `seocontent` varchar(556) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_seocontent`
--

INSERT INTO `feiyu_seocontent` (`id`, `contentid`, `seotitle`, `seokey`, `seocontent`) VALUES
(1, 1, '关于我们的标题', '关于我们的关键字', '关于我们的简介');

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_set`
--

CREATE TABLE `feiyu_set` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL,
  `time` bigint(66) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_set`
--

INSERT INTO `feiyu_set` (`id`, `value`, `time`) VALUES
(1, '{\"name\":\"飞鱼网络\",\"logo\":\"uploads/1623294499345.png\",\"banquan\":\"襄阳飞鱼网络科技有限公司版权所有\",\"url\":\"https://www.feiyu.net.cn\",\"address\":\"襄阳万达广场\",\"user\":\"王露\",\"mobile\":\"13797599411\",\"email\":\"280177366@qq.com\",\"qrcode\":\"uploads/1623307822925.png\",\"qqnumber\":280177366,\"sign\":\"4a3a3bf41c820c2c44ab0f12c318ba4781019deef4ce877d8a3f114aee8eeeff\"}', 1623315762254);

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_setseo`
--

CREATE TABLE `feiyu_setseo` (
  `id` int(11) NOT NULL,
  `contentid` int(4) NOT NULL,
  `seotitle` varchar(222) NOT NULL,
  `seokey` varchar(334) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `feiyu_style`
--

CREATE TABLE `feiyu_style` (
  `id` int(11) NOT NULL,
  `style` varchar(222) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feiyu_style`
--

INSERT INTO `feiyu_style` (`id`, `style`) VALUES
(1, '单行输入文本框'),
(2, '多行输入文本框'),
(3, '富文本编辑器'),
(4, '单图/文件上传'),
(5, '多图/文件上传'),
(6, '下拉选择列表');

--
-- 转储表的索引
--

--
-- 表的索引 `feiyu_ad`
--
ALTER TABLE `feiyu_ad`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_admin`
--
ALTER TABLE `feiyu_admin`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_construct`
--
ALTER TABLE `feiyu_construct`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_content`
--
ALTER TABLE `feiyu_content`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_contentmodel`
--
ALTER TABLE `feiyu_contentmodel`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_dictionary`
--
ALTER TABLE `feiyu_dictionary`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_dictionarydata`
--
ALTER TABLE `feiyu_dictionarydata`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_model`
--
ALTER TABLE `feiyu_model`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_seo`
--
ALTER TABLE `feiyu_seo`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_seocontent`
--
ALTER TABLE `feiyu_seocontent`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_set`
--
ALTER TABLE `feiyu_set`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_setseo`
--
ALTER TABLE `feiyu_setseo`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `feiyu_style`
--
ALTER TABLE `feiyu_style`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `feiyu_ad`
--
ALTER TABLE `feiyu_ad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `feiyu_admin`
--
ALTER TABLE `feiyu_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `feiyu_construct`
--
ALTER TABLE `feiyu_construct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用表AUTO_INCREMENT `feiyu_content`
--
ALTER TABLE `feiyu_content`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `feiyu_contentmodel`
--
ALTER TABLE `feiyu_contentmodel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `feiyu_dictionary`
--
ALTER TABLE `feiyu_dictionary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `feiyu_dictionarydata`
--
ALTER TABLE `feiyu_dictionarydata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `feiyu_model`
--
ALTER TABLE `feiyu_model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `feiyu_seo`
--
ALTER TABLE `feiyu_seo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `feiyu_seocontent`
--
ALTER TABLE `feiyu_seocontent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `feiyu_set`
--
ALTER TABLE `feiyu_set`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `feiyu_setseo`
--
ALTER TABLE `feiyu_setseo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `feiyu_style`
--
ALTER TABLE `feiyu_style`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
