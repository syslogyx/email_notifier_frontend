-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2017 at 01:17 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_mgmt`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_types`
--

CREATE TABLE `activity_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories_technology_mapping`
--

CREATE TABLE `categories_technology_mapping` (
  `id` int(10) UNSIGNED NOT NULL,
  `technology_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` bigint(20) DEFAULT NULL,
  `tel_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `project_id`, `name`, `address`, `city`, `pincode`, `state`, `country`, `mobile`, `tel_number`, `email`, `business`, `type`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Smart Factory Client', 'Butebori', 'Nagpur', 789789, 'Maharashtra', 'India', 7894567894, '7777777777', 'ssssss@smart.com', 'Circulips', 'temp', 1, 1, '2017-09-15 04:22:17', '2017-09-15 04:22:17'),
(2, NULL, 'Smart JH', 'wanadongri', 'Nagpur', 789789, 'Maharashtra', 'India', 4894561238, '7777777777', 'jh@smart.com', 'Mahindra product', 'temp', 1, 1, '2017-09-15 04:24:52', '2017-09-15 04:24:52'),
(3, NULL, 'Vyako', 'Sonegao', 'Nagpur', 789789, 'Maharashtra', 'India', 8559637415, '7777777777', 'hrms@vyako.com', 'HRMS', 'temp', 1, 1, '2017-09-15 04:27:07', '2017-09-15 04:27:07'),
(4, NULL, 'Vyako_project', 'Sonegao', 'Nagpur', 789789, 'Maharashtra', 'India', 2587413697, '7777777777', 'project@vyako.com', 'Project', 'temp', 1, 1, '2017-09-15 04:28:40', '2017-09-15 04:28:40'),
(5, NULL, 'Juno', 'Banglore', 'Nagpur', 789789, 'Maharashtra', 'India', 4567891235, '7777777777', 'juno@clinic.com', 'clinical', 'temp', 1, 1, '2017-09-15 05:00:52', '2017-09-15 05:00:52');

-- --------------------------------------------------------

--
-- Table structure for table `domains`
--

CREATE TABLE `domains` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_resets_table', 1),
(2, '2017_05_03_100406_create_test_table', 1),
(3, '2017_05_10_130017_create_technologies_table', 1),
(4, '2017_05_11_063738_create_domains_table', 1),
(5, '2017_05_11_112523_create_project_documents_table', 1),
(6, '2017_05_16_071713_create_clients_table', 1),
(7, '2017_05_17_085111_create_activity_types_table', 1),
(8, '2017_05_17_091141_create_users_table', 1),
(9, '2017_05_18_110612_entrust_setup_tables', 1),
(10, '2017_05_29_093123_create_projects_table', 1),
(11, '2017_06_06_090838_create_tasks_table', 1),
(12, '2017_06_06_093204_create_milestones_table', 1),
(13, '2017_06_06_093807_create_project_resources_table', 1),
(14, '2017_06_06_124133_create_project_technologies_table', 1),
(15, '2017_06_09_064522_create_status_table', 1),
(16, '2017_06_09_065129_create_task_comment_logs_table', 1),
(17, '2017_06_09_065507_create_technical_supports_table', 1),
(18, '2017_06_09_072136_create_project_activity_status_logs_table', 1),
(19, '2017_08_29_104311_create_categories_table', 1),
(20, '2017_08_29_121408_create_categories_technology_mapping_table', 1),
(21, '2017_08_31_055544_create_user_technology_mapping_table', 1),
(22, '2017_09_11_081021_create_resource_matrix_log_table', 1),
(23, '2017_09_20_060914_create_project_poc_table', 1),
(24, '2017_09_21_134357_alter_project_table', 1),
(25, '2017_09_21_135207_alter_task_table', 1),
(26, '2017_09_21_135340_alter_milestone_table', 1),
(27, '2017_09_21_135524_alter_project_resource_table', 1),
(28, '2017_09_21_135720_alter_project_activity_status_log_table', 1),
(29, '2017_09_25_063749_alter_user_table', 1),
(30, '2017_09_26_093903_alter_activity_status_log_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `milestones`
--

CREATE TABLE `milestones` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `status_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestone_index` int(11) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `revised_date` datetime DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `milestones`
--

INSERT INTO `milestones` (`id`, `title`, `project_id`, `status_id`, `milestone_index`, `due_date`, `start_date`, `revised_date`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'milestone 1', 5, '1', 1, '2017-06-21 00:00:00', NULL, '2017-06-21 00:00:00', 'dfsdfsdfsdfsdfsd', 1, 1, '2017-09-29 03:41:01', '2017-09-29 03:41:01'),
(2, 'milestone 2', 5, '1', 2, '2017-06-21 00:00:00', NULL, '2017-06-21 00:00:00', 'dfsdfsdfsdfsdfsd', 1, 1, '2017-09-29 03:41:25', '2017-09-29 03:41:25');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `revised_date` datetime DEFAULT NULL,
  `duration_in_days` double(5,2) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `current_milestone_index` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `domain_id`, `user_id`, `status_id`, `client_id`, `name`, `start_date`, `due_date`, `revised_date`, `duration_in_days`, `description`, `current_milestone_index`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 3, 4, 'Ongoing', 1, 'Smart Factory', '2016-11-08 00:00:00', '2017-11-16 00:00:00', '2017-11-16 00:00:00', 0.00, 'Smart factory', 0, 1, 1, '2017-09-15 04:51:20', '2017-09-22 05:55:14'),
(2, 3, 2, 'Onhold', 2, 'Smart JH', '2017-06-20 00:00:00', '2017-11-17 00:00:00', '2017-11-17 00:00:00', 0.00, 'Smart jh', 0, 1, 1, '2017-09-15 04:51:55', '2017-09-22 04:19:13'),
(3, 2, 2, 'Pending', 3, 'Vyako Hrms', '2016-12-21 00:00:00', '2017-11-24 00:00:00', '2017-11-24 00:00:00', 0.00, 'Human resource management system', 0, 1, 1, '2017-09-15 04:53:01', '2017-09-22 04:33:14'),
(4, 2, 2, 'Pending', 4, 'Project Management', '2017-03-17 00:00:00', '2017-12-22 00:00:00', '2017-12-22 00:00:00', 0.00, 'Project management', 0, 1, 1, '2017-09-15 04:53:53', '2017-09-22 04:42:10'),
(5, 2, 2, 'Closed', 5, 'JUNO Clinic', '2017-09-12 00:00:00', '2017-09-30 00:00:00', '2017-09-30 00:00:00', 0.00, 'JUNO Clinic', 0, 1, 1, '2017-09-15 05:02:46', '2017-09-25 03:46:26'),
(6, 2, 14, 'Onhold', 3, 'tests project', '2017-09-01 00:00:00', '2017-09-07 00:00:00', '2017-09-07 00:00:00', 0.00, 'as', 0, 1, 1, '2017-09-26 05:45:11', '2017-09-26 05:45:11'),
(7, 3, 18, 'Closed', 1, 'New project', '2017-09-01 00:00:00', '2017-09-30 00:00:00', '2017-09-30 00:00:00', 0.00, 'new project description', 0, 1, 1, '2017-09-27 04:55:26', '2017-09-27 04:55:26');

-- --------------------------------------------------------

--
-- Table structure for table `project_activity_status_logs`
--

CREATE TABLE `project_activity_status_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `activity_type_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `spent_hour` double(5,2) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `revised_date` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_documents`
--

CREATE TABLE `project_documents` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_poc`
--

CREATE TABLE `project_poc` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile_primary` bigint(20) DEFAULT NULL,
  `mobile_secondary` bigint(20) DEFAULT NULL,
  `email_personal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_official` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_resources`
--

CREATE TABLE `project_resources` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `status_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_technologies`
--

CREATE TABLE `project_technologies` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `technology_id` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resource_matrix_log`
--

CREATE TABLE `resource_matrix_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `remark` text COLLATE utf8mb4_unicode_ci,
  `start_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(10) UNSIGNED NOT NULL,
  `activity_type_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `activity_type_id`, `name`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'PROJECT', 'Ongoing', 1, 1, '2017-09-22 03:43:39', '2017-09-22 03:43:39'),
(2, 'PROJECT', 'Onhold', 1, 1, '2017-09-22 03:43:48', '2017-09-22 03:43:48'),
(3, 'PROJECT', 'Closed', 1, 1, '2017-09-22 03:43:55', '2017-09-22 03:43:55'),
(4, 'PROJECT', 'Pending', 1, 1, '2017-09-22 03:44:04', '2017-09-26 05:46:27');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_resource_id` int(11) DEFAULT NULL,
  `milestone_id` int(11) DEFAULT NULL,
  `status_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `technical_support_id` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `completion_date` datetime DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `parent_id` int(11) DEFAULT NULL,
  `estimated_hours` double(5,2) DEFAULT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `original_task_id` int(11) NOT NULL,
  `priority_id` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `project_resource_id`, `milestone_id`, `status_id`, `technical_support_id`, `start_date`, `completion_date`, `title`, `description`, `parent_id`, `estimated_hours`, `comment`, `original_task_id`, `priority_id`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 2, 5, '1', 1, NULL, '2017-05-30 00:00:00', 'task', 'description', 1, 4.00, 'commment', 1, 1, 1, 1, '2017-09-29 04:24:54', '2017-09-29 04:24:54'),
(2, 1, 5, '1', 1, NULL, '2017-05-30 00:00:00', 'task', 'description', 1, 4.00, 'commment', 1, 1, 1, 1, '2017-09-29 04:25:07', '2017-09-29 04:25:07');

-- --------------------------------------------------------

--
-- Table structure for table `task_comment_logs`
--

CREATE TABLE `task_comment_logs` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(11) DEFAULT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `technical_supports`
--

CREATE TABLE `technical_supports` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `technologies`
--

CREATE TABLE `technologies` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `alias` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `technologies`
--

INSERT INTO `technologies` (`id`, `name`, `parent_id`, `alias`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Android', NULL, 'Android', 1, 1, '2017-09-15 04:05:48', '2017-09-15 04:05:48'),
(2, 'PHP', NULL, 'PHP', 1, 1, '2017-09-15 04:06:11', '2017-09-15 04:06:11'),
(3, 'Java', NULL, 'Java', 1, 1, '2017-09-15 04:06:21', '2017-09-15 04:06:21'),
(4, 'Oracle', NULL, 'Oracle', 1, 1, '2017-09-15 04:06:37', '2017-09-15 04:06:37'),
(5, 'Cake php', 2, 'Cake php', 1, 1, '2017-09-15 04:06:49', '2017-09-18 23:45:30'),
(6, 'Laravel', 2, 'Larawel', 1, 1, '2017-09-15 04:06:58', '2017-09-18 23:45:48'),
(7, 'Testing', NULL, 'Testing', 1, 1, '2017-09-15 04:07:26', '2017-09-15 04:07:26'),
(8, 'HTML', NULL, 'HTML', 1, 1, '2017-09-15 04:18:53', '2017-09-15 04:18:53'),
(9, 'CSS', NULL, 'CSS', 1, 1, '2017-09-15 04:19:01', '2017-09-15 04:19:01'),
(10, 'Java Script', NULL, 'Java Script', 1, 1, '2017-09-15 04:19:17', '2017-09-15 04:19:17'),
(11, 'Jquery', NULL, 'Jquery', 1, 1, '2017-09-15 04:19:28', '2017-09-15 04:19:28'),
(12, 'Angular Js', NULL, 'Angular Js', 1, 1, '2017-09-15 04:26:01', '2017-09-15 04:26:01'),
(13, 'Spring & Hybernet', 3, 'Spring & Hybernet', 1, 1, '2017-09-18 23:48:38', '2017-09-18 23:48:38');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` mediumint(9) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `email_internal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_external` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `total_experience` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `gender`, `status`, `email_internal`, `email_external`, `department`, `designation`, `avatar`, `remember_token`, `created_at`, `updated_at`, `user_id`, `total_experience`) VALUES
(1, 'Monica Jha', 'monica@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'female', 1, 'monica@syslogyx.in', 'monica@vyako.com', 'web', 'Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(2, 'Chandrashekhar Sontakke', 'shekhar@vyako.com', '$2y$10$YbpCpNJ9ZwFBP9myxFQEd.d15tY1nNGxtkMTx8nMwJdgcQjqwNDm6', 'Male', 1, 'shekhar@syslogyx.in', 'shekhar@vyako.com', 'web', 'Sr. Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(3, 'Suchitra Singh', 'suchitra.singh@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'male', 1, 'suchitra.singh@syslogyx.in', 'suchitra.singh@vyako.com', 'Quality Assurance\r\n', 'Sr Quality Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(4, 'Nikhil Moharkar', 'nikhil.moharkar@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'male', 1, 'nikhil.moharkar@syslogyx.in', 'nikhil.moharkar@vyako.com', 'Android', 'Sr. Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(5, 'Sayali Suryawanshi', 'sayali.suryawanshi@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'female', 1, 'sayali.suryawanshi@syslogyx.in', 'sayali.suryawanshi@vyako.com', 'web', 'Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(6, 'Bhushan Chumbhale', 'bhushan.chumbhale@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'male', 1, 'bhushan.chumbhale@syslogyx.in', 'bhushan.chumbhale@vyako.com', 'Quality Assurance', 'Quality Enginner', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(7, 'Alok Das', 'alok.das@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'male', 1, 'alok.das@syslogyx.in', 'alok.das@vyako.com', 'Web', 'Trainee', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(8, 'Yogesh Jaiswal', 'yogesh.jaiswal@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'male', 1, 'yogesh.jaiswal@syslogyx.in', 'yogesh.jaiswal@vyako.com', 'Web', 'Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(9, 'Surbhi Shrivastava', 'surbhi.shrivastava@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'female', 1, 'surbhi.shrivastava@syslogyx.in', 'surbhi.shrivastava@vyako.com', 'Web', 'Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(10, 'Bhavana Mulani', 'bhavana.mulani@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'female', 1, 'bhavana.mulani@syslogyx.in', 'bhavana.mulani@vyako.com', 'Android', 'Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(11, 'Vikram Sharma', 'vikram.sharma@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'male', 1, 'vikram.sharma@syslogyx.in', 'vikram.sharma@vyako.com', 'Backend', 'Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(12, 'Namrata Khobragade', 'namrata.khobragade@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'female', 1, 'namrata.khobragade@syslogyx.in', 'namrata.khobragade@vyako.com', 'Backend', 'Trainee', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(13, 'Anuradha Singh', 'anuradha.singh@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'female', 1, 'anuradha.singh@syslogyx.in', 'anuradha.singh@vyako.com', 'Business Development', 'Business developer\r\n', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(14, 'Neha Photani', 'neha.photani@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'female', 1, 'neha.photani@syslogyx.in', 'neha.photani@vyako.com', 'Business Development', 'Sr. Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(15, 'Neha Kadbe', 'neha.kadbe@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'female', 1, 'neha.kadbe@syslogyx.in', 'neha.kadbe@vyako.com', 'Web Development', 'Software Engineer', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(16, 'Kaushik Patil', 'kaushik.patil@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'male', 1, 'kaushik.patil@syslogyx.in', 'kaushik.patil@vyako.com', 'Android Developer', 'Software Engineer\r\n', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(17, 'Sanket Gore', 'sanket.gore@vyako.com', '$2y$10$w94HXMppk5BUndWbQI/y2OHhVblDrJ/fNzvIlKHbTJ/GNmCx6igtW', 'male', 1, 'sanket.gore@syslogyx.in', 'sanket.gore@vyako.com', 'Embedded Developer', 'Software Engineer\r\n', 'image.png', NULL, '2017-09-15 03:37:00', '2017-09-15 03:37:00', 0, ''),
(18, 'Admin', 'ad@mailinator.com', '$2y$10$aV8MeJWpFWpZG4gJw8wpWeeJsGUqgzmHhfbqfeRilc.DMOlxJpFbC', 'Female', NULL, 'admin@syslogic.in', 'admin@vyako.com', 'Business Development', 'Software Engineer', '1496387855_93017.jpg', NULL, NULL, NULL, 1, '6.10'),
(19, 'HR Admin', 'testing@mailinator.com', '$2y$10$aV8MeJWpFWpZG4gJw8wpWeeJsGUqgzmHhfbqfeRilc.DMOlxJpFbC', 'Female', NULL, 'hradmin@gmail.com', 'testing@mailinator.com', 'Development', 'Quality Enginner', 'default_profile.png', NULL, NULL, NULL, 157, '2.3'),
(20, 'Bhushan Jain', 'bhushan.chumbhale@vyako.com', '$2y$10$Ce5.xU6Ve/t3nQQFtEiD2ucZklJDSd2PwBi9RchIHJyB7s4/oEp/.', 'Male', NULL, 'bhushan.chumbhale@syslogic.in', 'bhushan.chumbhale@vyako.com', 'Quality Assurance', 'Quality Enginner', '1496387896_890655.png', NULL, NULL, NULL, 158, '2.4'),
(21, 'Employee Syslogic', 'employeesyslogic@gmail.com', '$2y$10$JWRe4S1udBI1sfeQRrnXaOaHbHwSHlRsVI5IbKL5UclMbbgqs4UHm', 'Male', NULL, 'employeesyslogic@gmail.com', 'employeesyslogic@gmail.com', 'Development', 'Sr Software Engineer', '1496388987_686492.jpg', NULL, NULL, NULL, 159, '1.2'),
(22, 'Vyako Manager', 'manager@gmail.com', '$2y$10$6/zOCPQ/TSHyCufr0RvDQObJJRQ9KgDikTAbKsando6.B..2Wus0y', 'Male', NULL, 'manager@gmail.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 160, '1.2'),
(23, 'Vyako Mentor', 'mentor@gmail.com', '$2y$10$eaygMNfXFNXHOLL1mC5pOuCGBONbNN0rSRdUUvBmqRUUQedaI6rTS', 'Male', NULL, 'mentor@gmail.com', 'mentor@gmail.com', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 161, '1.1'),
(24, 'Suchintra Singh', 'suchintra.singh@vyako.com', '$2y$10$Glgip2oamKPJ7/yVqU5O7.Ty5H8FiZEeY0R4w5/CB58xUFSU0Jjb2', 'Male', NULL, 'suchintra.singh@syslogic.in', 'suchintra.singh@vyako.com', 'Quality Assurance', 'Sr Quality Engineer', '1496402730_95092.jpeg', NULL, NULL, NULL, 162, '3.5'),
(25, 'Alok Das', 'emp@mailinator.com', '$2y$10$aV8MeJWpFWpZG4gJw8wpWeeJsGUqgzmHhfbqfeRilc.DMOlxJpFbC', 'Male', NULL, 'alok.das@syslogic.in', '', 'Development', 'Trne Web Developer', '1496731321_817718.jpg', NULL, NULL, NULL, 163, '0.5'),
(26, 'Sanket Gore', 'san@mailinator.com', '$2y$10$o0CiZvpxgYBtHuYfAm93TOweJlF3yzuqqpuBe1jOeSHtLXCd.GRAm', 'Male', NULL, 'sanket.gore@syslogic.in', 'sanket.gore@syslogyx.com', 'Development', 'Software Engineer', '1496732203_711181.jpg', NULL, NULL, NULL, 164, '1.0'),
(27, 'Manager Syslogic', 'managersyslogic12345@gmail.com', '$2y$10$rKpH8axU9rYEmGa2yPqKCewADF1rbH06.hUhZ.fcGG9TTZwHKqRt2', 'Male', NULL, 'managersyslogic12345@gmail.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 165, '0.0'),
(28, 'Mentor Syslogic', 'mentorsyslogic@gmail.com', '$2y$10$PsE.nOidm77zQ6l819cFAexMW7aU2uIUtS9a23LUE/EwZlaEefjty', 'Male', NULL, 'mentorsyslogic@gmail.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 166, '0.0'),
(29, 'Employee2 Syslogic', 'employee2syslogic123@gmail.com', '$2y$10$kfd39ZSa8rFPLSGz275ZP.xi1KZBHVuPa2eM2FKpJ108DzlAuQx1G', 'Male', NULL, 'employee2syslogic123@gmail.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 167, '0.0'),
(30, 'Test Employee1', 'test@mailinator.com', '$2y$10$1WtbTFpC4DvI0WCnXAkTje3Fr3.tEPAa4XugNySD6aOrLHllsIPTq', 'Male', NULL, 'test@mailinator.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 168, '0.0'),
(31, 'mentor Test', 'mentortest@mailinator.com', '$2y$10$YBBskjcS7AYxe63ZfX7JnOgwyuatjEHI4S8JBSY2tv/xU5TAOgW3C', 'Male', NULL, 'mentortest@mailinator.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 169, '0.0'),
(32, 'Manager Test', 'managertest@mailinator.com', '$2y$10$s.evIVdYm0dx82Bbh.0vx.Nm5m7d4d/XLVltABBNqIidOuJ7XfKPO', 'Male', NULL, 'managertest@mailinator.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 170, '0.0'),
(33, 'Nilesh Wankhade', 'nilesh.wankhade@syslogic.in', '$2y$10$hOv2vJwY2B6WhAxxtPGoweYtyrfOKw26jfvWBxWD0b8LX3sUn3fFi', 'Male', NULL, 'nilesh.wankhade@syslogic.in', 'nilesh.wankhade@syslogic.in', 'Development', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 171, '0.5'),
(34, 'John', 'sayali.suryawanshi@vyako.com', '$2y$10$hRaKB85kCbRQoLxA1Tv74u9XZ6kk1O8ZJNbIq5faoZt/0v3PSr9HW', 'Female', NULL, 'sayali.suryawanshi@vyako.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 172, ''),
(35, 'Monica Jha', 'monica.jha@vyako.com', '$2y$10$F07ToHU1ogzje2RAJ4mDwuLvJM.jnypt6K8iRMBi8H0moWoAmfYhi', 'Female', NULL, 'monica.jha@vyako.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 175, ''),
(36, 'Bhushan Jain', 'bhushan.vyako@gmail.com', '$2y$10$cl5Amjy6x0QPwUUjYJkeE.lmPNsBlC9l4fQsDjLfjLOTs7I5FIevq', 'Male', NULL, 'bhushan.chumbhale@syslogic.in', 'bhushan.chumbhale@vyako.com', 'Quality Assurance', 'Sr Software Engineer', '1501234916_521789.png', NULL, NULL, NULL, 176, ''),
(37, 'Aniruddha Agarkathe', 'aniruddha.agarkathe@syslogic.in', '$2y$10$TbokbMvFa9Zl2qGeOQeheeWow4plHOFBeLKwEKqJeo8QZIzOEAuJG', 'Male', NULL, 'aniruddha.agarkathe@syslogic.in', '', 'Quality Assurance', 'Trne Quality Engineer', '1502176868_968078.jpg', NULL, NULL, NULL, 177, '0.0'),
(38, 'newuser', 'new@gmail.com', '$2y$10$QJnCv5dhv0WR8NSp3eeqnOeDanjHg23oSVAx8ztU2ZAklRFdHtnYq', 'Male', NULL, 'new@gmail.com', '', 'Quality Assurance', 'Sr Software Engineer', 'default_profile.png', NULL, NULL, NULL, 178, '');

-- --------------------------------------------------------

--
-- Table structure for table `user_technology_mapping`
--

CREATE TABLE `user_technology_mapping` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `technology_id` int(11) DEFAULT NULL,
  `duration_in_month` double(8,2) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_types`
--
ALTER TABLE `activity_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories_technology_mapping`
--
ALTER TABLE `categories_technology_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_technology_mapping_technology_id_foreign` (`technology_id`),
  ADD KEY `categories_technology_mapping_category_id_foreign` (`category_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_project_id_foreign` (`project_id`);

--
-- Indexes for table `domains`
--
ALTER TABLE `domains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `milestones`
--
ALTER TABLE `milestones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `milestones_project_id_foreign` (`project_id`),
  ADD KEY `milestones_status_id_foreign` (`status_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_domain_id_foreign` (`domain_id`),
  ADD KEY `projects_user_id_foreign` (`user_id`),
  ADD KEY `projects_client_id_foreign` (`client_id`),
  ADD KEY `projects_status_id_foreign` (`status_id`);

--
-- Indexes for table `project_activity_status_logs`
--
ALTER TABLE `project_activity_status_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_activity_status_logs_status_id_foreign` (`status_id`);

--
-- Indexes for table `project_documents`
--
ALTER TABLE `project_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_poc`
--
ALTER TABLE `project_poc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_poc_project_id_foreign` (`project_id`);

--
-- Indexes for table `project_resources`
--
ALTER TABLE `project_resources`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `project_resources_project_id_user_id_unique` (`project_id`,`user_id`),
  ADD KEY `project_resources_user_id_foreign` (`user_id`),
  ADD KEY `project_resources_domain_id_foreign` (`domain_id`),
  ADD KEY `project_resources_status_id_foreign` (`status_id`);

--
-- Indexes for table `project_technologies`
--
ALTER TABLE `project_technologies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_technologies_project_id_foreign` (`project_id`),
  ADD KEY `project_technologies_technology_id_foreign` (`technology_id`);

--
-- Indexes for table `resource_matrix_log`
--
ALTER TABLE `resource_matrix_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resource_matrix_log_project_id_foreign` (`project_id`),
  ADD KEY `resource_matrix_log_user_id_foreign` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_project_resource_id_foreign` (`project_resource_id`),
  ADD KEY `tasks_milestone_id_foreign` (`milestone_id`),
  ADD KEY `tasks_technical_support_id_foreign` (`technical_support_id`),
  ADD KEY `tasks_status_id_foreign` (`status_id`);

--
-- Indexes for table `task_comment_logs`
--
ALTER TABLE `task_comment_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_comment_logs_task_id_foreign` (`task_id`);

--
-- Indexes for table `technical_supports`
--
ALTER TABLE `technical_supports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `technical_supports_user_id_foreign` (`user_id`),
  ADD KEY `technical_supports_task_id_foreign` (`task_id`);

--
-- Indexes for table `technologies`
--
ALTER TABLE `technologies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_technology_mapping`
--
ALTER TABLE `user_technology_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_technology_mapping_user_id_foreign` (`user_id`),
  ADD KEY `user_technology_mapping_technology_id_foreign` (`technology_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_types`
--
ALTER TABLE `activity_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `categories_technology_mapping`
--
ALTER TABLE `categories_technology_mapping`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `domains`
--
ALTER TABLE `domains`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `milestones`
--
ALTER TABLE `milestones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `project_activity_status_logs`
--
ALTER TABLE `project_activity_status_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `project_documents`
--
ALTER TABLE `project_documents`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `project_poc`
--
ALTER TABLE `project_poc`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `project_resources`
--
ALTER TABLE `project_resources`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `project_technologies`
--
ALTER TABLE `project_technologies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `resource_matrix_log`
--
ALTER TABLE `resource_matrix_log`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `task_comment_logs`
--
ALTER TABLE `task_comment_logs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `technical_supports`
--
ALTER TABLE `technical_supports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `technologies`
--
ALTER TABLE `technologies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `user_technology_mapping`
--
ALTER TABLE `user_technology_mapping`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
