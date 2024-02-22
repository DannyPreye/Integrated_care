export function hideEmail(email: string)
{

    const [ username, domain ] = email.split('@');


    const firstChar = username.charAt(0);
    const lastChar = username.charAt(username.length - 1);


    const asterisks = '*'.repeat(username.length - 2);

    const hiddenEmail = `${firstChar}${asterisks}${lastChar}@${domain}`;

    return hiddenEmail;
}
