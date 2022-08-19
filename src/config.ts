const config = {
    componentTemplate: [
        "import styles from './$FileName.module.scss'",
        "",
        "",
        "",
        "",
        "",
        "",
        "const $FileName: React.FC<{  }> = ({  }) => {",
        "",
        "",
        "\treturn (",
        "\t\t<div  className={styles.container}>",
        "\t\t\t",
        "\t\t</div>",
        "\t)",
        "}",
        "",
        "",
        "",
        "",
        "",
        "",
        "export default $FileName"
    ].join('\n'),

    sassTemplate: [
        ".container {",
        "\t",
        "}"
    ].join("\n")
}


export default config