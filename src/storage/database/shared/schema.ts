import { sql } from "drizzle-orm";
import {
  pgTable, serial, varchar, text, integer, boolean, numeric, timestamp, jsonb,
  index,
} from "drizzle-orm/pg-core";

// ========== 系统表（禁止删除） ==========
export const healthCheck = pgTable("health_check", {
  id: serial().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow(),
});

// ========== 管理员系统 ==========
export const adminUsers = pgTable(
  "admin_users",
  {
    id: serial().primaryKey(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    password_hash: varchar("password_hash", { length: 255 }).notNull(),
    real_name: varchar("real_name", { length: 100 }),
    role: varchar("role", { length: 20 }).notNull().default("ADMIN"),
    avatar: varchar("avatar", { length: 500 }),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 20 }),
    status: varchar("status", { length: 20 }).notNull().default("ACTIVE"),
    last_login_at: timestamp("last_login_at", { withTimezone: true }),
    last_login_ip: varchar("last_login_ip", { length: 45 }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("admin_users_username_idx").on(table.username),
    index("admin_users_status_idx").on(table.status),
  ]
);

export const apiKeys = pgTable(
  "api_keys",
  {
    id: serial().primaryKey(),
    key: varchar("key", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    scopes: text("scopes").array(),
    status: varchar("status", { length: 20 }).notNull().default("ACTIVE"),
    expires_at: timestamp("expires_at", { withTimezone: true }),
    last_used_at: timestamp("last_used_at", { withTimezone: true }),
    created_by: integer("created_by").references(() => adminUsers.id),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("api_keys_key_idx").on(table.key),
    index("api_keys_status_idx").on(table.status),
    index("api_keys_created_by_idx").on(table.created_by),
  ]
);

// ========== CMS 内容管理 ==========
export const siteSettings = pgTable("site_settings", {
  id: serial().primaryKey(),
  site_name: varchar("site_name", { length: 200 }),
  site_logo: varchar("site_logo", { length: 500 }),
  site_description: text("site_description"),
  keywords: varchar("keywords", { length: 500 }),
  icp: varchar("icp", { length: 100 }),
  contact_email: varchar("contact_email", { length: 255 }),
  contact_phone: varchar("contact_phone", { length: 20 }),
  social_links: jsonb("social_links"),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});

export const brandInfo = pgTable("brand_info", {
  id: serial().primaryKey(),
  brand_name: varchar("brand_name", { length: 200 }).notNull(),
  brand_name_en: varchar("brand_name_en", { length: 200 }),
  slogan: varchar("slogan", { length: 500 }),
  mission: text("mission"),
  description: text("description"),
  core_values: text("core_values").array(),
  founded_year: integer("founded_year"),
  founder: varchar("founder", { length: 100 }),
  founder_bio: text("founder_bio"),
  founder_avatar: varchar("founder_avatar", { length: 500 }),
  total_members: integer("total_members").default(0),
  core_members: integer("core_members").default(0),
  renewal_rate: integer("renewal_rate").default(0),
  valuation: numeric("valuation", { precision: 12, scale: 2 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});

export const homeSections = pgTable(
  "home_sections",
  {
    id: serial().primaryKey(),
    section_key: varchar("section_key", { length: 50 }).notNull().unique(),
    title: varchar("title", { length: 200 }),
    subtitle: varchar("subtitle", { length: 500 }),
    content: jsonb("content"),
    background_image: varchar("background_image", { length: 500 }),
    primary_button_text: varchar("primary_button_text", { length: 100 }),
    primary_button_link: varchar("primary_button_link", { length: 500 }),
    secondary_button_text: varchar("secondary_button_text", { length: 100 }),
    secondary_button_link: varchar("secondary_button_link", { length: 500 }),
    sort_order: integer("sort_order").notNull().default(0),
    is_visible: boolean("is_visible").notNull().default(true),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("home_sections_section_key_idx").on(table.section_key),
    index("home_sections_sort_order_idx").on(table.sort_order),
  ]
);

export const timelineEvents = pgTable(
  "timeline_events",
  {
    id: serial().primaryKey(),
    year: integer("year").notNull(),
    month: integer("month"),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    icon_type: varchar("icon_type", { length: 50 }),
    image: varchar("image", { length: 500 }),
    sort_order: integer("sort_order").notNull().default(0),
    is_highlight: boolean("is_highlight").notNull().default(false),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("timeline_events_year_idx").on(table.year),
    index("timeline_events_sort_order_idx").on(table.sort_order),
  ]
);

export const news = pgTable(
  "news",
  {
    id: serial().primaryKey(),
    title: varchar("title", { length: 300 }).notNull(),
    source: varchar("source", { length: 200 }),
    type: varchar("type", { length: 20 }).notNull().default("NEWS"),
    cover_image: varchar("cover_image", { length: 500 }),
    summary: text("summary"),
    content: text("content"),
    link_url: varchar("link_url", { length: 500 }),
    publish_date: timestamp("publish_date", { withTimezone: true }),
    sort_order: integer("sort_order").notNull().default(0),
    is_published: boolean("is_published").notNull().default(true),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("news_type_idx").on(table.type),
    index("news_is_published_idx").on(table.is_published),
    index("news_publish_date_idx").on(table.publish_date),
  ]
);

export const stores = pgTable(
  "stores",
  {
    id: serial().primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    address: text("address").notNull(),
    city: varchar("city", { length: 100 }),
    district: varchar("district", { length: 100 }),
    phone: varchar("phone", { length: 20 }),
    business_hours: jsonb("business_hours"),
    latitude: numeric("latitude", { precision: 10, scale: 7 }),
    longitude: numeric("longitude", { precision: 10, scale: 7 }),
    cover_image: varchar("cover_image", { length: 500 }),
    images: text("images").array(),
    description: text("description"),
    facilities: text("facilities").array(),
    sort_order: integer("sort_order").notNull().default(0),
    status: varchar("status", { length: 20 }).notNull().default("OPEN"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("stores_city_idx").on(table.city),
    index("stores_status_idx").on(table.status),
  ]
);

export const coaches = pgTable(
  "coaches",
  {
    id: serial().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    title: varchar("title", { length: 200 }),
    avatar: varchar("avatar", { length: 500 }),
    bio: text("bio"),
    specialties: text("specialties").array(),
    certifications: text("certifications").array(),
    experience_years: integer("experience_years"),
    sort_order: integer("sort_order").notNull().default(0),
    is_active: boolean("is_active").notNull().default(true),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("coaches_is_active_idx").on(table.is_active),
    index("coaches_sort_order_idx").on(table.sort_order),
  ]
);

// ========== 课程管理 ==========
export const courseCategories = pgTable(
  "course_categories",
  {
    id: serial().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    name_en: varchar("name_en", { length: 100 }),
    description: text("description"),
    icon: varchar("icon", { length: 100 }),
    sort_order: integer("sort_order").notNull().default(0),
    is_active: boolean("is_active").notNull().default(true),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("course_categories_is_active_idx").on(table.is_active),
  ]
);

export const courses = pgTable(
  "courses",
  {
    id: serial().primaryKey(),
    title: varchar("title", { length: 200 }).notNull(),
    subtitle: varchar("subtitle", { length: 300 }),
    category_id: integer("category_id").references(() => courseCategories.id),
    description: text("description"),
    highlights: text("highlights").array(),
    suitable_for: text("suitable_for").array(),
    outline: jsonb("outline"),
    duration: integer("duration"),
    difficulty: varchar("difficulty", { length: 20 }).default("BEGINNER"),
    price: numeric("price", { precision: 10, scale: 2 }),
    original_price: numeric("original_price", { precision: 10, scale: 2 }),
    member_price: numeric("member_price", { precision: 10, scale: 2 }),
    cover_image: varchar("cover_image", { length: 500 }),
    images: text("images").array(),
    coach_id: integer("coach_id").references(() => coaches.id),
    capacity: integer("capacity"),
    total_bookings: integer("total_bookings").default(0),
    rating: numeric("rating", { precision: 3, scale: 2 }).default("5.0"),
    review_count: integer("review_count").default(0),
    status: varchar("status", { length: 20 }).notNull().default("DRAFT"),
    sort_order: integer("sort_order").notNull().default(0),
    is_recommended: boolean("is_recommended").notNull().default(false),
    is_hot: boolean("is_hot").notNull().default(false),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("courses_category_id_idx").on(table.category_id),
    index("courses_coach_id_idx").on(table.coach_id),
    index("courses_status_idx").on(table.status),
    index("courses_is_recommended_idx").on(table.is_recommended),
  ]
);

// ========== 用户与会员 ==========
export const users = pgTable(
  "users",
  {
    id: serial().primaryKey(),
    username: varchar("username", { length: 100 }).unique(),
    password_hash: varchar("password_hash", { length: 255 }),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    nickname: varchar("nickname", { length: 100 }),
    avatar: varchar("avatar", { length: 500 }),
    gender: varchar("gender", { length: 10 }).default("FEMALE"),
    birthday: timestamp("birthday", { withTimezone: true }),
    height: numeric("height", { precision: 5, scale: 1 }),
    weight: numeric("weight", { precision: 5, scale: 1 }),
    status: varchar("status", { length: 20 }).notNull().default("ACTIVE"),
    last_login_at: timestamp("last_login_at", { withTimezone: true }),
    total_training_count: integer("total_training_count").default(0),
    total_training_minutes: integer("total_training_minutes").default(0),
    consecutive_days: integer("consecutive_days").default(0),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("users_username_idx").on(table.username),
    index("users_phone_idx").on(table.phone),
    index("users_status_idx").on(table.status),
  ]
);

export const memberLevels = pgTable(
  "member_levels",
  {
    id: serial().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    level: integer("level").notNull(),
    description: text("description"),
    benefits: jsonb("benefits"),
    upgrade_condition: text("upgrade_condition"),
    base_price: numeric("base_price", { precision: 10, scale: 2 }),
    color: varchar("color", { length: 20 }),
    icon: varchar("icon", { length: 50 }),
    is_active: boolean("is_active").notNull().default(true),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("member_levels_level_idx").on(table.level),
  ]
);

export const memberships = pgTable(
  "memberships",
  {
    id: serial().primaryKey(),
    user_id: integer("user_id").notNull().references(() => users.id),
    level_id: integer("level_id").notNull().references(() => memberLevels.id),
    order_id: integer("order_id"),
    type: varchar("type", { length: 20 }).notNull().default("NEW"),
    start_date: timestamp("start_date", { withTimezone: true }).notNull(),
    end_date: timestamp("end_date", { withTimezone: true }).notNull(),
    status: varchar("status", { length: 20 }).notNull().default("ACTIVE"),
    price: numeric("price", { precision: 10, scale: 2 }),
    remark: text("remark"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("memberships_user_id_idx").on(table.user_id),
    index("memberships_level_id_idx").on(table.level_id),
    index("memberships_status_idx").on(table.status),
  ]
);

export const userBodyData = pgTable(
  "user_body_data",
  {
    id: serial().primaryKey(),
    user_id: integer("user_id").notNull().references(() => users.id),
    weight: numeric("weight", { precision: 5, scale: 1 }),
    body_fat_rate: numeric("body_fat_rate", { precision: 4, scale: 2 }),
    muscle_mass: numeric("muscle_mass", { precision: 5, scale: 1 }),
    bmi: numeric("bmi", { precision: 4, scale: 1 }),
    waist: numeric("waist", { precision: 5, scale: 1 }),
    hip: numeric("hip", { precision: 5, scale: 1 }),
    chest: numeric("chest", { precision: 5, scale: 1 }),
    record_date: timestamp("record_date", { withTimezone: true }).notNull(),
    remark: text("remark"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("user_body_data_user_id_idx").on(table.user_id),
    index("user_body_data_record_date_idx").on(table.record_date),
  ]
);

// ========== 订单与预约 ==========
export const orders = pgTable(
  "orders",
  {
    id: serial().primaryKey(),
    order_no: varchar("order_no", { length: 50 }).notNull().unique(),
    user_id: integer("user_id").notNull().references(() => users.id),
    type: varchar("type", { length: 20 }).notNull(),
    total_amount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    discount_amount: numeric("discount_amount", { precision: 10, scale: 2 }).default("0"),
    pay_amount: numeric("pay_amount", { precision: 10, scale: 2 }).notNull(),
    pay_method: varchar("pay_method", { length: 20 }),
    pay_time: timestamp("pay_time", { withTimezone: true }),
    status: varchar("status", { length: 20 }).notNull().default("PENDING"),
    refund_time: timestamp("refund_time", { withTimezone: true }),
    refund_reason: text("refund_reason"),
    remark: text("remark"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("orders_order_no_idx").on(table.order_no),
    index("orders_user_id_idx").on(table.user_id),
    index("orders_status_idx").on(table.status),
    index("orders_created_at_idx").on(table.created_at),
  ]
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial().primaryKey(),
    order_id: integer("order_id").notNull().references(() => orders.id),
    item_type: varchar("item_type", { length: 20 }).notNull(),
    item_id: integer("item_id").notNull(),
    item_name: varchar("item_name", { length: 200 }),
    item_image: varchar("item_image", { length: 500 }),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    quantity: integer("quantity").notNull().default(1),
    subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("order_items_order_id_idx").on(table.order_id),
  ]
);

export const bookings = pgTable(
  "bookings",
  {
    id: serial().primaryKey(),
    booking_no: varchar("booking_no", { length: 50 }).notNull().unique(),
    user_id: integer("user_id").notNull().references(() => users.id),
    course_id: integer("course_id").notNull().references(() => courses.id),
    coach_id: integer("coach_id").references(() => coaches.id),
    store_id: integer("store_id").references(() => stores.id),
    booking_date: timestamp("booking_date", { withTimezone: true }).notNull(),
    duration: integer("duration"),
    status: varchar("status", { length: 20 }).notNull().default("PENDING"),
    cancel_reason: text("cancel_reason"),
    check_in_time: timestamp("check_in_time", { withTimezone: true }),
    remark: text("remark"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("bookings_booking_no_idx").on(table.booking_no),
    index("bookings_user_id_idx").on(table.user_id),
    index("bookings_course_id_idx").on(table.course_id),
    index("bookings_status_idx").on(table.status),
    index("bookings_booking_date_idx").on(table.booking_date),
  ]
);

// ========== 内容图片库 ==========
export const contentImages = pgTable(
  "content_images",
  {
    id: serial().primaryKey(),
    file_name: varchar("file_name", { length: 255 }).notNull(),
    file_path: varchar("file_path", { length: 500 }).notNull(),
    file_size: integer("file_size"),
    mime_type: varchar("mime_type", { length: 100 }),
    width: integer("width"),
    height: integer("height"),
    alt: varchar("alt", { length: 255 }),
    category: varchar("category", { length: 50 }),
    uploader_id: integer("uploader_id"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("content_images_category_idx").on(table.category),
  ]
);
