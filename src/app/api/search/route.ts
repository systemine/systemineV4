import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";
import { getAllFreeResources } from "@/lib/free-resources";

export async function GET(request: NextRequest) {
const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase();

if (!query || query.length < 2) {
return NextResponse.json({ results: [] });
}

const terms = query.split(/\s+/).filter(Boolean);

const matches = [
...getAllProducts().map((item) => ({
type: "Product",
title: item.title,
description: [item.description, ...item.categories, ...item.tags].join(" "),
url: `/shelves/${item.slug}`,
})),
...getAllArticles().map((item) => ({
type: "Article",
title: item.title,
description: [item.excerpt, ...item.tags].join(" "),
url: `/articles/${item.slug}`,
})),
...getAllFreeResources().map((item) => ({
type: "Free resource",
title: item.title,
description: [item.description, item.category, ...item.tags].join(" "),
url: `/free-resources/${item.slug}`,
})),
{
type: "Interactive tool",
title: "The Thought Check",
description:
"Reflective tool for examining thoughts, considering alternative interpretations, and checking belief strength.",
url: "/tools/thought-check",
},
];

const results = matches
.filter((item) => {
const searchableText = `${item.title} ${item.description}`.toLowerCase();
return terms.every((term) => searchableText.includes(term));
})
.slice(0, 10);

return NextResponse.json({ results });
}
