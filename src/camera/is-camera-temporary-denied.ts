export async function isCameraTemporaryDenied() {
  if (!navigator.permissions) return true

  try {
    const status = await navigator.permissions.query({
      name: "camera" as PermissionName
    })

    return status.state === "prompt"
  } catch {
    return true
  }
}
