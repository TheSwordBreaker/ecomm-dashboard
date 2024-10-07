import { pgTable, varchar, timestamp, text, integer, index, foreignKey, numeric, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const store = pgTable("Store", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	userId: text("userId").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
});

export const billboard = pgTable("Billboard", {
	id: text("id").primaryKey().notNull(),
	storeId: text("storeId").notNull(),
	label: text("label").notNull(),
	imageUrl: text("imageUrl").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		storeIdIdx: index("Billboard_storeId_idx").using("btree", table.storeId.asc().nullsLast()),
		billboardStoreIdFkey: foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "Billboard_storeId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const category = pgTable("Category", {
	id: text("id").primaryKey().notNull(),
	storeId: text("storeId").notNull(),
	billboardId: text("billboardId").notNull(),
	name: text("name").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		billboardIdIdx: index("Category_billboardId_idx").using("btree", table.billboardId.asc().nullsLast()),
		storeIdIdx: index("Category_storeId_idx").using("btree", table.storeId.asc().nullsLast()),
		categoryStoreIdFkey: foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "Category_storeId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		categoryBillboardIdFkey: foreignKey({
			columns: [table.billboardId],
			foreignColumns: [billboard.id],
			name: "Category_billboardId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const size = pgTable("Size", {
	id: text("id").primaryKey().notNull(),
	storeId: text("storeId").notNull(),
	name: text("name").notNull(),
	value: text("value").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		storeIdIdx: index("Size_storeId_idx").using("btree", table.storeId.asc().nullsLast()),
		sizeStoreIdFkey: foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "Size_storeId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const color = pgTable("Color", {
	id: text("id").primaryKey().notNull(),
	storeId: text("storeId").notNull(),
	name: text("name").notNull(),
	value: text("value").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		storeIdIdx: index("Color_storeId_idx").using("btree", table.storeId.asc().nullsLast()),
		colorStoreIdFkey: foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "Color_storeId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const product = pgTable("Product", {
	id: text("id").primaryKey().notNull(),
	storeId: text("storeId").notNull(),
	categoryId: text("categoryId").notNull(),
	name: text("name").notNull(),
	price: numeric("price", { precision: 65, scale:  30 }).notNull(),
	isFeatured: boolean("isFeatured").default(false).notNull(),
	isArchived: boolean("isArchived").default(false).notNull(),
	sizeId: text("sizeId").notNull(),
	colorId: text("colorId").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		categoryIdIdx: index("Product_categoryId_idx").using("btree", table.categoryId.asc().nullsLast()),
		colorIdIdx: index("Product_colorId_idx").using("btree", table.colorId.asc().nullsLast()),
		sizeIdIdx: index("Product_sizeId_idx").using("btree", table.sizeId.asc().nullsLast()),
		storeIdIdx: index("Product_storeId_idx").using("btree", table.storeId.asc().nullsLast()),
		productStoreIdFkey: foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "Product_storeId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		productCategoryIdFkey: foreignKey({
			columns: [table.categoryId],
			foreignColumns: [category.id],
			name: "Product_categoryId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		productSizeIdFkey: foreignKey({
			columns: [table.sizeId],
			foreignColumns: [size.id],
			name: "Product_sizeId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		productColorIdFkey: foreignKey({
			columns: [table.colorId],
			foreignColumns: [color.id],
			name: "Product_colorId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const image = pgTable("Image", {
	id: text("id").primaryKey().notNull(),
	productId: text("productId").notNull(),
	url: text("url").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		productIdIdx: index("Image_productId_idx").using("btree", table.productId.asc().nullsLast()),
		imageProductIdFkey: foreignKey({
			columns: [table.productId],
			foreignColumns: [product.id],
			name: "Image_productId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const order = pgTable("Order", {
	id: text("id").primaryKey().notNull(),
	storeId: text("storeId").notNull(),
	isPaid: boolean("isPaid").default(false).notNull(),
	phone: text("phone").default('').notNull(),
	address: text("address").default('').notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		storeIdIdx: index("Order_storeId_idx").using("btree", table.storeId.asc().nullsLast()),
		orderStoreIdFkey: foreignKey({
			columns: [table.storeId],
			foreignColumns: [store.id],
			name: "Order_storeId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});

export const orderItems = pgTable("OrderItems", {
	id: text("id").primaryKey().notNull(),
	orderId: text("orderId").notNull(),
	productId: text("productId").notNull(),
},
(table) => {
	return {
		orderIdIdx: index("OrderItems_orderId_idx").using("btree", table.orderId.asc().nullsLast()),
		productIdIdx: index("OrderItems_productId_idx").using("btree", table.productId.asc().nullsLast()),
		orderItemsOrderIdFkey: foreignKey({
			columns: [table.orderId],
			foreignColumns: [order.id],
			name: "OrderItems_orderId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
		orderItemsProductIdFkey: foreignKey({
			columns: [table.productId],
			foreignColumns: [product.id],
			name: "OrderItems_productId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	}
});