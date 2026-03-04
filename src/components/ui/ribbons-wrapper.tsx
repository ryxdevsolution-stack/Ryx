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
      baseThickness={22}
      baseSpring={0.04}
      baseFriction={0.9}
      offsetFactor={0}
      pointCount={70}
      maxAge={600}
      speedMultiplier={0.35}
      enableFade={true}
      backgroundColor={[0, 0, 0, 0]}
    />
  )
}
