<div class="cafe">

**☕** Te ajudei? Me manda um cafézinho ^^
 
```
cafe@danifluffy.dev
```
</div>

<style>
    .cafe {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    gap: var(--border-radius);
    margin: 30px auto;
    padding: var(--border-radius);

    width: fit-content;
    border-radius: var(--border-radius);
    background-color: var(--bg2);

    pre, p {
        margin: 0;
        text-align: center;
    }

    .buttons {
        top: -4px
    }

    code {
        background-color: transparent!important;
        padding: 0;
        font-family: "Quicksand", sans-serif !important;
        font-weight: 800;

        &::before {
            content: "Pix: ";
        }
    }
}
</style>