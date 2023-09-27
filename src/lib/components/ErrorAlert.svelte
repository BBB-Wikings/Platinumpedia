<script lang="ts">
  import Alert from "$lib/components/Alert.svelte";

  let message: string = '';
  let action:string = '';
  let actionText:string = '';
  let classes:string = '';

  export {
    message,
    action,
    actionText,
    classes,
  }
</script>

<Alert
  {message}
  {classes}
  {action}
  {actionText}
  title="Error"
  color="error"
  icon="bxs:error"
/>