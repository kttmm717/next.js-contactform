import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
        //ログインが必要なときにどこにリダイレクトするか指定
    },
    session: {
        strategy: 'jwt', // ★これがないと getToken() で token が取れない！
      },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {

            const isLoggedIn = !!auth?.user;
            //ログインしているユーザー情報が入ってるかもしれないやつ
            //!!は真偽値に変換するためのテクニック

            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            //今アクセスしようとしてるURLが/adminから始まるかどうかをチェックするコード

            if (isOnAdmin) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/admin', nextUrl));
            }
            return true;
        },
    },
    providers: [],
    //ここに認証方法（Google、GitHub、credentialsなど）を追加する
    //別ファイルでCredentials()を追加してるからここは空でもOK

} satisfies NextAuthConfig;
//satisfiesは型を「完全に一致しているか」チェックするTypeScriptの機能
//このファイルがNextAuthConfig型に合ってるかをTypeScriptがチェック