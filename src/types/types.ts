type Journal = {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string
  analysis: string
  pinned?: boolean
  metrics?: Record<string, Metric>
  last_analysed?: string
}


type Metric = {
  enabled: boolean;
  value: number;
};