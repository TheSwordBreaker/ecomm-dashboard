import { relations } from "drizzle-orm/relations";
import { store, billboard, category, size, color, product, image, order, orderItems } from "./schema";

export const billboardRelations = relations(billboard, ({one, many}) => ({
	store: one(store, {
		fields: [billboard.storeId],
		references: [store.id]
	}),
	categories: many(category),
}));

export const storeRelations = relations(store, ({many}) => ({
	billboards: many(billboard),
	categories: many(category),
	sizes: many(size),
	colors: many(color),
	products: many(product),
	orders: many(order),
}));

export const categoryRelations = relations(category, ({one, many}) => ({
	store: one(store, {
		fields: [category.storeId],
		references: [store.id]
	}),
	billboard: one(billboard, {
		fields: [category.billboardId],
		references: [billboard.id]
	}),
	products: many(product),
}));

export const sizeRelations = relations(size, ({one, many}) => ({
	store: one(store, {
		fields: [size.storeId],
		references: [store.id]
	}),
	products: many(product),
}));

export const colorRelations = relations(color, ({one, many}) => ({
	store: one(store, {
		fields: [color.storeId],
		references: [store.id]
	}),
	products: many(product),
}));

export const productRelations = relations(product, ({one, many}) => ({
	store: one(store, {
		fields: [product.storeId],
		references: [store.id]
	}),
	category: one(category, {
		fields: [product.categoryId],
		references: [category.id]
	}),
	size: one(size, {
		fields: [product.sizeId],
		references: [size.id]
	}),
	color: one(color, {
		fields: [product.colorId],
		references: [color.id]
	}),
	images: many(image),
	orderItems: many(orderItems),
}));

export const imageRelations = relations(image, ({one}) => ({
	product: one(product, {
		fields: [image.productId],
		references: [product.id]
	}),
}));

export const orderRelations = relations(order, ({one, many}) => ({
	store: one(store, {
		fields: [order.storeId],
		references: [store.id]
	}),
	orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({one}) => ({
	order: one(order, {
		fields: [orderItems.orderId],
		references: [order.id]
	}),
	product: one(product, {
		fields: [orderItems.productId],
		references: [product.id]
	}),
}));