import { Link } from "react-router-dom";
import type { ModelSpec } from "@/evena/models";
import { ProductThumbnail } from "@/components/marketplace/ProductThumbnail";
import { EVENA_MARKETPLACE_CATALOG } from "@/data/evenaMarketplaceCatalog";
import { Badge } from "@/components/ui/badge";

interface Props {
  model: ModelSpec;
}

/**
 * Carte d'un modèle de l'explorer.
 * Réutilise ProductThumbnail en injectant designSeed dérivé de la variante,
 * pour visualiser la diversité des 15 000 modèles.
 */
export function ExplorerModelCard({ model }: Props) {
  const baseProduct = EVENA_MARKETPLACE_CATALOG[model.productIndex - 1];
  // Produit "virtuel" pour la variante : on remplace le designSeed pour varier la composition.
  const virtualProduct = { ...baseProduct, designSeed: model.designSeed };

  return (
    <Link
      to={`/marketplace/${model.productId}`}
      className="group block rounded-xl border border-border/60 bg-card overflow-hidden transition-all hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.4)]"
      aria-label={`${model.productTitle} – variante ${model.variantIndex + 1}`}
    >
      <div className="aspect-[3/4] overflow-hidden bg-background">
        <ProductThumbnail product={virtualProduct} />
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium leading-tight line-clamp-1 text-foreground">
            {model.productTitle}
          </h3>
          <span className="text-[10px] font-mono text-muted-foreground shrink-0">
            v{String(model.variantIndex + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
            {model.family}
          </Badge>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {model.layout}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full border border-border/60"
              style={{ backgroundColor: model.palette.gold }}
              aria-hidden
            />
            {model.accentHue}
          </span>
          <span>·</span>
          <span className="truncate">{model.motif}</span>
        </div>
      </div>
    </Link>
  );
}
