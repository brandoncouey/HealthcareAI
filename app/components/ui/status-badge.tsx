import { Badge } from "@/app/components/ui/badge"
import { cn } from "@/app/lib/utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "yes": 
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/40 hover:border-emerald-400/60 hover:scale-105 transition-all duration-200"
      case "no": 
        return "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/40 hover:border-red-400/60 hover:scale-105 transition-all duration-200"
      case "indication": 
        return "bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/50 hover:border-amber-300/70 hover:scale-105 transition-all duration-200"
      case "ileostomy": 
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/40 hover:border-emerald-400/60 hover:scale-105 transition-all duration-200"
      case "spouse": 
        return "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/40 hover:border-blue-400/60 hover:scale-105 transition-all duration-200"
      case "n/a": 
        return "bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/40 hover:border-slate-400/60 hover:scale-105 transition-all duration-200"
      case "new": 
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/40 hover:border-emerald-400/60 hover:scale-105 transition-all duration-200"
      case "am": 
        return "bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/40 hover:border-slate-400/60 hover:scale-105 transition-all duration-200"
      case "op": 
        return "bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/40 hover:border-blue-400/60 hover:scale-105 transition-all duration-200"
      // Diagnosis-related statuses - make them red
      case "radiation cystitis":
      case "hypertension":
      case "other lab abnormality":
      case "hyperlipidemia":
      case "other vascular disease":
      case "urinary tract infection":
      case "atrial fibrillation or cardiac dysrhythmias":
      case "other urinary disorder":
      case "cancer":
      case "pain disorder":
        return "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/40 hover:border-red-400/60 hover:scale-105 transition-all duration-200"
      default: 
        return "bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/40 hover:border-slate-400/60 hover:scale-105 transition-all duration-200"
    }
  }

  return (
    <Badge className={cn(getStatusColor(status), className)}>
      {status}
    </Badge>
  )
}
