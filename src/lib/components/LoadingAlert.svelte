<script lang="ts">
  import Alert from "$lib/components/Alert.svelte";

  let message: string = '';
  let classes:string = '';

  export {
    message,
    classes,
  }
</script>

<Alert
  {message}
  {classes}
  title="Loading..."
  color="secondary"
  icon="eos-icons:bubble-loading"
/>