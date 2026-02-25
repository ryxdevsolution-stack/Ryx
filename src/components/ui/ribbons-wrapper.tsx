"use client"

import dynamic from "next/dynamic"

const Ribbons = dynamic(
  () => import("@/components/ui/ribbons"),
  { ssr: false, loading: () => null }
)

export function RibbonsWrapper() {
  return (
    <Ribbons
      colors={["#999999"]}
      baseThickness={30}
      baseSpring={0.04}
      baseFriction={0.9}
      pointCount={30}
      speedMultiplier={0.4}
      enableFade={true}
      backgroundColor={[0, 0, 0, 0]}
    />
  )
}
