import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { Doc, Id } from './_generated/dataModel'

// create api end point
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();


    if (!identity) {
      throw new Error("Not Authenticated")
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });
    return document;
  }
})

// get api end point
export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();


    if (!identity) {
      throw new Error("Not Authenticated")
    }
    const documents = await ctx.db.query("documents").collect();
    return documents;
  }
})

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q
          .eq("userId", userId)
          .eq("parentDocument", args.parentDocument)
      )
      .filter((q) =>
        q.eq(q.field("isArchived"), false)
      )
      .order("desc")
      .collect();

    return documents;
  },
});

// Define a mutation called 'archive'
export const archive = mutation({
  // Specify the argument for the mutation (document ID)
  args: { id: v.id("documents") },

  // Handler function for the mutation
  handler: async (ctx, args) => {
    // Retrieve user identity from the context
    const identity = await ctx.auth.getUserIdentity();

    // Check if the user is authenticated
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Extract the user ID from the identity
    const userId = identity.subject;

    // Retrieve the existing document from the database based on the provided ID
    const existingDocument = await ctx.db.get(args.id);

    // Check if the document exists
    if (!existingDocument) {
      throw new Error("Not Found");
    }

    // Check if the authenticated user is the owner of the document
    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Define a recursive function to archive the document and its children
    const recursiveArchive = async (documentId: Id<"documents">) => {
      // Query children documents based on user ID and parent-child relationship
      const children = await ctx.db.query("documents")
        .withIndex("by_user_parent", (q) => (
          q.eq("userId", userId)
            .eq("parentDocument", documentId)
        )).collect();

      // Iterate through children and recursively archive them
      for (const child of children) {
        // Mark the child document as archived
        await ctx.db.patch(child._id, {
          isArchived: true,
        })

        // Recursive call to archive children's descendants
        await recursiveArchive(child._id);
      }
    }

    // Archive the main document by updating its 'isArchived' property
    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    })

    // Recursively archive children documents
    recursiveArchive(args.id);

    // Return the archived document
    return document;
  }
});


export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authorized");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  }
})

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) => (
          q
            .eq("userId", userId)
            .eq("parentDocument", documentId)
        ))
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    }

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const document = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    return document;
  }
});


export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    // Retrieve user identity from the context
    const identity = await ctx.auth.getUserIdentity();

    // Check if the user is authenticated
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Extract the user ID from the identity
    const userId = identity.subject;


    // Retrieve the existing document from the database based on the provided ID
    const existingDocument = await ctx.db.get(args.id);

    // Check if the document exists
    if (!existingDocument) {
      throw new Error("Not Found");
    }

    // Check if the authenticated user is the owner of the document
    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }


    const document = await ctx.db.delete(args.id);
    return document;
  }
})
